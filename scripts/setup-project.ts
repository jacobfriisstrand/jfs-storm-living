#!/usr/bin/env tsx

import { execSync } from "node:child_process";
import { existsSync, writeFileSync } from "node:fs";
import * as readline from "node:readline";

type ProjectConfig = {
  sanityProjectId: string;
  sanityApiToken: string;
  projectName: string;
  vercelProjectName?: string;
};

class ProjectSetup {
  private rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  private async question(prompt: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(prompt, resolve);
    });
  }

  private async confirm(prompt: string): Promise<boolean> {
    const answer = await this.question(`${prompt} (y/n): `);
    return answer.toLowerCase().startsWith("y");
  }

  private async getProjectConfig(): Promise<ProjectConfig> {
    console.warn("\n🚀 Welcome to the Next.js + Sanity Project Setup!\n");
    console.warn("This script will help you set up your new project with:");
    console.warn("- Environment variables configuration");
    console.warn("- Vercel project creation");
    console.warn("- Environment variables deployment to Vercel\n");

    const sanityProjectId = await this.question("Enter your Sanity Project ID: ");
    const sanityApiToken = await this.question("Enter your Sanity API Read Token: ");
    const projectName = await this.question("Enter your project name (for Vercel): ");

    return {
      sanityProjectId,
      sanityApiToken,
      projectName,
    };
  }

  private createEnvFile(config: ProjectConfig): void {
    const envContent = `NEXT_PUBLIC_SANITY_PROJECT_ID=${config.sanityProjectId}

# PRODUCTION DATASET
# NEXT_PUBLIC_SANITY_DATASET="production"

# DEVELOPMENT DATASET
NEXT_PUBLIC_SANITY_DATASET="development"

NEXT_PUBLIC_SANITY_API_READ_TOKEN=${config.sanityApiToken}
`;

    writeFileSync(".env", envContent);
    console.warn("✅ Created .env file with your configuration");
  }

  private async checkVercelCli(): Promise<boolean> {
    try {
      execSync("vercel --version", { stdio: "ignore" });
      return true;
    }
    catch {
      return false;
    }
  }

  private async installVercelCli(): Promise<void> {
    console.warn("\n📦 Installing Vercel CLI...");
    try {
      execSync("npm install -g vercel", { stdio: "inherit" });
      console.warn("✅ Vercel CLI installed successfully");
    }
    catch (error) {
      console.error("❌ Failed to install Vercel CLI:", error);
      throw error;
    }
  }

  private async setupVercelProject(config: ProjectConfig): Promise<void> {
    console.warn("\n🌐 Setting up Vercel project...");

    try {
      // Check if user is logged in to Vercel
      try {
        execSync("vercel whoami", { stdio: "ignore" });
      }
      catch {
        console.warn("Please log in to Vercel:");
        execSync("vercel login", { stdio: "inherit" });
      }

      // Create Vercel project
      console.warn("Creating Vercel project...");
      execSync(`vercel --name "${config.projectName}" --yes`, {
        encoding: "utf8",
        stdio: "pipe",
      });

      console.warn("✅ Vercel project created successfully");

      // Add environment variables to Vercel
      console.warn("Adding environment variables to Vercel...");

      // Production environment variables
      execSync(`vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID production`, {
        input: config.sanityProjectId,
        stdio: "inherit",
      });

      execSync(`vercel env add NEXT_PUBLIC_SANITY_API_READ_TOKEN production`, {
        input: config.sanityApiToken,
        stdio: "inherit",
      });

      execSync(`vercel env add NEXT_PUBLIC_SANITY_DATASET production`, {
        input: "production",
        stdio: "inherit",
      });

      // Preview environment variables
      execSync(`vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID preview`, {
        input: config.sanityProjectId,
        stdio: "inherit",
      });

      execSync(`vercel env add NEXT_PUBLIC_SANITY_API_READ_TOKEN preview`, {
        input: config.sanityApiToken,
        stdio: "inherit",
      });

      execSync(`vercel env add NEXT_PUBLIC_SANITY_DATASET preview`, {
        input: "development",
        stdio: "inherit",
      });

      console.warn("✅ Environment variables added to Vercel");
    }
    catch (error) {
      console.error("❌ Failed to set up Vercel project:", error);
      throw error;
    }
  }

  private async runTypegen(): Promise<void> {
    console.warn("\n🔧 Generating TypeScript types from Sanity schemas...");
    try {
      execSync("npm run typegen", { stdio: "inherit" });
      console.warn("✅ TypeScript types generated successfully");
    }
    catch (error) {
      console.error("❌ Failed to generate types:", error);
      throw error;
    }
  }

  public async run(): Promise<void> {
    try {
      // Check if .env already exists
      if (existsSync(".env")) {
        const overwrite = await this.confirm("⚠️  .env file already exists. Do you want to overwrite it?");
        if (!overwrite) {
          console.warn("Setup cancelled.");
          return;
        }
      }

      // Get project configuration
      const config = await this.getProjectConfig();

      // Create .env file
      this.createEnvFile(config);

      // Check and install Vercel CLI if needed
      const hasVercelCli = await this.checkVercelCli();
      if (!hasVercelCli) {
        const installCli = await this.confirm("Vercel CLI is not installed. Do you want to install it?");
        if (installCli) {
          await this.installVercelCli();
        }
        else {
          console.warn("⚠️  Skipping Vercel setup. You can run this script again later.");
          return;
        }
      }

      // Set up Vercel project
      const setupVercel = await this.confirm("Do you want to set up a Vercel project and deploy environment variables?");
      if (setupVercel) {
        await this.setupVercelProject(config);
      }

      // Generate types
      await this.runTypegen();

      console.warn("\n🎉 Project setup completed successfully!");
      console.warn("\nNext steps:");
      console.warn("1. Run `npm run dev` to start the development server");
      console.warn("2. Open http://localhost:3000 to see your site");
      console.warn("3. Open http://localhost:3000/admin to edit content in Sanity");

      if (setupVercel) {
        console.warn("4. Your project is ready for deployment on Vercel!");
      }
    }
    catch (error) {
      console.error("❌ Setup failed:", error);
      process.exit(1);
    }
    finally {
      this.rl.close();
    }
  }
}

// Run the setup
const setup = new ProjectSetup();
setup.run().catch((error) => {
  console.error("❌ Unexpected error:", error);
  process.exit(1);
});
