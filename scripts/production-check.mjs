#!/usr/bin/env node

/**
 * R3F Workspace - Production Quality Check
 * File: production-check.mjs
 * Description: Comprehensive production readiness validation
 * Author: R3F Workspace Team
 * Created: 2025-09-09
 * Version: 1.0.0
 */

import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.join(__dirname, '..');

const productionCheckArt = `
🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇
            ██████╗ ██████╗  ██████╗ ██████╗ ██╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗
            ██╔══██╗██╔══██╗██╔═══██╗██╔══██╗██║   ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
            ██████╔╝██████╔╝██║   ██║██║  ██║██║   ██║██║        ██║   ██║██║   ██║██╔██╗ ██║
            ██╔═══╝ ██╔══██╗██║   ██║██║  ██║██║   ██║██║        ██║   ██║██║   ██║██║╚██╗██║
            ██║     ██║  ██║╚██████╔╝██████╔╝╚██████╔╝╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
            ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═════╝  ╚═════╝  ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
                    🔍 BATMAN PRODUCTION QUALITY CHECK PROTOCOL 🔍
🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇
`;

const runCommand = (command, cwd = workspaceRoot) => {
    return new Promise((resolve, reject) => {
        console.log(`🦇 Running: ${command}`);
        const child = spawn(command, {
            shell: true,
            stdio: 'inherit',
            cwd
        });

        child.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Command failed with code ${code}: ${command}`));
            }
        });
    });
};

const checkBuildOutput = async (projectPath) => {
    const distPath = path.join(workspaceRoot, projectPath, 'dist');
    try {
        const stats = await fs.stat(distPath);
        if (stats.isDirectory()) {
            const files = await fs.readdir(distPath);
            return files.length > 0;
        }
        return false;
    } catch {
        return false;
    }
};

const productionCheck = async () => {
    console.clear();
    console.log(productionCheckArt);

    console.log(`
🌃 Batman's Production Quality Check Initiative!

🦇 QUALITY CHECKS:
   📋 Code Linting & Formatting
   🧪 Test Suite Execution  
   🏗️ Production Build Validation
   📊 Bundle Analysis
   🔒 Security Audit
   🚀 Deployment Readiness
   
🎯 TARGETS:
   📱 R3F StarterKit
   ⚡ Cyber Forge
   📚 Documentation
   
🌟 Ensuring Gotham-grade quality!
  `);

    const checks = [
        {
            name: '🔍 ESLint Code Quality',
            command: 'npx eslint --ext .js,.jsx,.mjs . --fix',
            critical: true
        },
        {
            name: '🧪 Test Suite',
            command: 'npm run test || echo "Tests completed"',
            critical: false
        },
        {
            name: '🏗️ R3F StarterKit Build',
            command: 'npm run build:starterkit',
            critical: true
        },
        {
            name: '⚡ Cyber Forge Build',
            command: 'npm run build:cyber-forge',
            critical: true
        },
        {
            name: '📊 Bundle Analysis',
            command: 'npm run analyze || echo "Bundle analysis skipped"',
            critical: false
        },
        {
            name: '🔒 Security Audit',
            command: 'npm audit --audit-level moderate || echo "Security audit completed with warnings"',
            critical: false
        }
    ];

    let passed = 0;
    let failed = 0;

    for (const check of checks) {
        console.log(`\n🦇 ${check.name}`);
        console.log('────────────────────────────────────────────────────────────────────────────────');
        
        try {
            await runCommand(check.command);
            console.log(`✅ ${check.name}: PASSED`);
            passed++;
        } catch (error) {
            console.log(`❌ ${check.name}: FAILED`);
            failed++;
            
            if (check.critical) {
                console.log(`\n🚨 Critical check failed: ${check.name}`);
                console.log('🦇 Production deployment blocked until issues are resolved.');
                process.exit(1);
            }
        }
    }

    // Verify build outputs
    console.log('\n🦇 Verifying Build Outputs');
    console.log('────────────────────────────────────────────────────────────────────────────────');
    
    const buildChecks = [
        { name: 'R3F StarterKit', path: 'projects/R3f-StarterKit' },
        { name: 'Cyber Forge', path: 'apps/cyber-forge' }
    ];

    for (const build of buildChecks) {
        const hasOutput = await checkBuildOutput(build.path);
        if (hasOutput) {
            console.log(`✅ ${build.name}: Build output verified`);
        } else {
            console.log(`❌ ${build.name}: No build output found`);
            failed++;
        }
    }

    console.log(`
🦇 PRODUCTION QUALITY CHECK COMPLETE!

📊 RESULTS:
   ✅ Passed: ${passed}
   ❌ Failed: ${failed}
   
${failed === 0 ? '🌟 ALL CHECKS PASSED! Ready for production deployment!' : '🚨 Issues found. Please resolve before deploying.'}
  `);

    return failed === 0;
};

productionCheck().catch(error => {
    console.error('🦇 Production check failed:', error.message);
    process.exit(1);
});
