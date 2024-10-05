// electron.vite.config.ts
import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";

// scripts/bytecode.ts
import path3 from "node:path";
import fs2 from "node:fs";
import { spawn as spawn2 } from "node:child_process";
import { createRequire as createRequire2 } from "node:module";
import colors from "picocolors";
import { normalizePath, createFilter } from "vite";
import ts from "typescript";
import MagicString from "magic-string";

// scripts/electron-core.ts
import path from "node:path";
import fs from "node:fs";
import { createRequire } from "node:module";
import { spawn } from "node:child_process";
var __electron_vite_injected_import_meta_url = "file:///Users/nabil/perso/bro/brownies/scripts/electron-core.ts";
var _require = createRequire(__electron_vite_injected_import_meta_url);
function getElectronPath() {
  let electronExecPath = process.env.ELECTRON_EXEC_PATH || "";
  if (!electronExecPath) {
    const electronModulePath = path.dirname(_require.resolve("electron"));
    const pathFile = path.join(electronModulePath, "path.txt");
    let executablePath;
    if (fs.existsSync(pathFile)) {
      executablePath = fs.readFileSync(pathFile, "utf-8");
    }
    if (executablePath) {
      electronExecPath = path.join(electronModulePath, "dist", executablePath);
      process.env.ELECTRON_EXEC_PATH = electronExecPath;
    } else {
      throw new Error("Electron uninstall");
    }
  }
  return electronExecPath;
}

// scripts/utils.ts
import { URL, URLSearchParams } from "node:url";
import path2 from "node:path";
import { createHash } from "node:crypto";
import { loadEnv as viteLoadEnv } from "vite";
var dynamicImport = new Function("file", "return import(file)");
function toRelativePath(filename, importer) {
  const relPath = path2.posix.relative(path2.dirname(importer), filename);
  return relPath.startsWith(".") ? relPath : `./${relPath}`;
}

// scripts/bytecode.ts
var __electron_vite_injected_import_meta_url2 = "file:///Users/nabil/perso/bro/brownies/scripts/bytecode.ts";
var _require2 = createRequire2(__electron_vite_injected_import_meta_url2);
function getBytecodeCompilerPath() {
  return path3.join(path3.dirname(_require2.resolve("electron-vite/package.json")), "bin", "electron-bytecode.js");
}
function compileToBytecode(code) {
  return new Promise((resolve2, reject) => {
    let data = Buffer.from([]);
    const electronPath = getElectronPath();
    const bytecodePath = getBytecodeCompilerPath();
    const proc = spawn2(electronPath, [bytecodePath], {
      env: { ELECTRON_RUN_AS_NODE: "1" },
      stdio: ["pipe", "pipe", "pipe", "ipc"]
    });
    if (proc.stdin) {
      proc.stdin.write(code);
      proc.stdin.end();
    }
    if (proc.stdout) {
      proc.stdout.on("data", (chunk) => {
        data = Buffer.concat([data, chunk]);
      });
      proc.stdout.on("error", (err) => {
        console.error(err);
      });
      proc.stdout.on("end", () => {
        resolve2(data);
      });
    }
    if (proc.stderr) {
      proc.stderr.on("data", (chunk) => {
        console.error("Error: ", chunk.toString());
      });
      proc.stderr.on("error", (err) => {
        console.error("Error: ", err);
      });
    }
    proc.addListener("message", (message) => console.log(message));
    proc.addListener("error", (err) => console.error(err));
    proc.on("error", (err) => reject(err));
    proc.on("exit", () => {
      resolve2(data);
    });
  });
}
var bytecodeModuleLoaderCode = [
  `"use strict";`,
  `const fs = require("fs");`,
  `const path = require("path");`,
  `const vm = require("vm");`,
  `const v8 = require("v8");`,
  `const Module = require("module");`,
  `v8.setFlagsFromString("--no-lazy");`,
  `v8.setFlagsFromString("--no-flush-bytecode");`,
  `const FLAG_HASH_OFFSET = 12;`,
  `const SOURCE_HASH_OFFSET = 8;`,
  `let dummyBytecode;`,
  `function setFlagHashHeader(bytecodeBuffer) {`,
  `  if (!dummyBytecode) {`,
  `    const script = new vm.Script("", {`,
  `      produceCachedData: true`,
  `    });`,
  `    dummyBytecode = script.createCachedData();`,
  `  }`,
  `  dummyBytecode.slice(FLAG_HASH_OFFSET, FLAG_HASH_OFFSET + 4).copy(bytecodeBuffer, FLAG_HASH_OFFSET);`,
  `};`,
  `function getSourceHashHeader(bytecodeBuffer) {`,
  `  return bytecodeBuffer.slice(SOURCE_HASH_OFFSET, SOURCE_HASH_OFFSET + 4);`,
  `};`,
  `function buffer2Number(buffer) {`,
  `  let ret = 0;`,
  `  ret |= buffer[3] << 24;`,
  `  ret |= buffer[2] << 16;`,
  `  ret |= buffer[1] << 8;`,
  `  ret |= buffer[0];`,
  `  return ret;`,
  `};`,
  `Module._extensions[".jsc"] = function (module, filename) {`,
  `  const bytecodeBuffer = fs.readFileSync(filename);`,
  `  if (!Buffer.isBuffer(bytecodeBuffer)) {`,
  `    throw new Error("BytecodeBuffer must be a buffer object.");`,
  `  }`,
  `  setFlagHashHeader(bytecodeBuffer);`,
  `  const length = buffer2Number(getSourceHashHeader(bytecodeBuffer));`,
  `  let dummyCode = "";`,
  `  if (length > 1) {`,
  `    dummyCode = "\\"" + "\\u200b".repeat(length - 2) + "\\"";`,
  `  }`,
  `  const script = new vm.Script(dummyCode, {`,
  `    filename: filename,`,
  `    lineOffset: 0,`,
  `    displayErrors: true,`,
  `    cachedData: bytecodeBuffer`,
  `  });`,
  `  if (script.cachedDataRejected) {`,
  `    throw new Error("Invalid or incompatible cached data (cachedDataRejected)");`,
  `  }`,
  `  const require = function (id) {`,
  `    return module.require(id);`,
  `  };`,
  `  require.resolve = function (request, options) {`,
  `    return Module._resolveFilename(request, module, false, options);`,
  `  };`,
  `  if (process.mainModule) {`,
  `    require.main = process.mainModule;`,
  `  }`,
  `  require.extensions = Module._extensions;`,
  `  require.cache = Module._cache;`,
  `  const compiledWrapper = script.runInThisContext({`,
  `    filename: filename,`,
  `    lineOffset: 0,`,
  `    columnOffset: 0,`,
  `    displayErrors: true`,
  `  });`,
  `  const dirname = path.dirname(filename);`,
  `  const args = [module.exports, require, module, filename, dirname, process, global];`,
  `  return compiledWrapper.apply(module.exports, args);`,
  `};`
];
function bytecodePlugin(options = {}) {
  if (process.env.NODE_ENV_ELECTRON_VITE !== "production") {
    return null;
  }
  const { chunkAlias = [], transformArrowFunctions = true, removeBundleJS = true, protectedStrings = [] } = options;
  const _chunkAlias = Array.isArray(chunkAlias) ? chunkAlias : [chunkAlias];
  const filter = createFilter(/\.(m?[jt]s|[jt]sx)$/);
  const escapeRegExpString = (str) => {
    return str.replace(/\\/g, "\\\\\\\\").replace(/[|{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\u002d");
  };
  const transformAllChunks = _chunkAlias.length === 0;
  const isBytecodeChunk = (chunkName) => {
    return transformAllChunks || _chunkAlias.some((alias) => alias === chunkName);
  };
  function tsCompile(source, options2 = {}) {
    if (null === options2) {
      options2 = { compilerOptions: { module: ts.ModuleKind.CommonJS } };
    }
    return ts.transpileModule(source, options2).outputText;
  }
  const _transform = (code) => {
    return tsCompile(code);
  };
  const useStrict = '"use strict";';
  const bytecodeModuleLoader = "bytecode-loader.js";
  let config;
  let useInRenderer = false;
  let bytecodeRequired = false;
  let bytecodeFiles = [];
  return {
    name: "vite:bytecode",
    apply: "build",
    enforce: "post",
    configResolved(resolvedConfig) {
      config = resolvedConfig;
      useInRenderer = config.plugins.some((p) => p.name === "vite:electron-renderer-preset-config");
      if (useInRenderer) {
        config.logger.warn(colors.yellow("bytecodePlugin is not support renderers"));
      }
    },
    transform(code, id) {
      if (protectedStrings.length === 0 || !filter(id))
        return;
      let match;
      let s;
      protectedStrings.forEach((str) => {
        const escapedStr = escapeRegExpString(str);
        const re = new RegExp(`\\u0027${escapedStr}\\u0027|\\u0022${escapedStr}\\u0022`, "g");
        const charCodes = Array.from(str).map((s2) => s2.charCodeAt(0));
        const replacement = `String.fromCharCode(${charCodes.toString()})`;
        while (match = re.exec(code)) {
          s ||= new MagicString(code);
          const [full] = match;
          s.overwrite(match.index, match.index + full.length, replacement, {
            contentOnly: true
          });
        }
      });
      if (s) {
        return {
          code: s.toString(),
          map: config.build.sourcemap ? s.generateMap({ hires: true }) : null
        };
      }
    },
    renderChunk(code, chunk) {
      if (useInRenderer) {
        return null;
      }
      if (chunk.type === "chunk" && isBytecodeChunk(chunk.name)) {
        bytecodeRequired = true;
        if (transformArrowFunctions) {
          return {
            code: _transform(code)
          };
        }
      }
      return null;
    },
    generateBundle() {
      if (!useInRenderer && bytecodeRequired) {
        this.emitFile({
          type: "asset",
          source: bytecodeModuleLoaderCode.join("\n") + "\n",
          name: "Bytecode Loader File",
          fileName: bytecodeModuleLoader
        });
      }
    },
    async writeBundle(options2, output) {
      if (useInRenderer || !bytecodeRequired) {
        return;
      }
      const outDir = options2.dir;
      bytecodeFiles = [];
      const bundles = Object.keys(output);
      const chunks = Object.values(output).filter(
        (chunk) => chunk.type === "chunk" && isBytecodeChunk(chunk.name) && chunk.fileName !== bytecodeModuleLoader
      );
      const bytecodeChunks = chunks.map((chunk) => chunk.fileName);
      const nonEntryChunks = chunks.filter((chunk) => !chunk.isEntry).map((chunk) => path3.basename(chunk.fileName));
      const pattern = nonEntryChunks.map((chunk) => `(${chunk})`).join("|");
      const bytecodeRE = pattern ? new RegExp(`require\\(\\S*(?=(${pattern})\\S*\\))`, "g") : null;
      const keepBundle = (chunkFileName) => {
        const newFileName = path3.resolve(path3.dirname(chunkFileName), `_${path3.basename(chunkFileName)}`);
        fs2.renameSync(chunkFileName, newFileName);
      };
      const getBytecodeLoaderBlock = (chunkFileName) => {
        return `require("${toRelativePath(bytecodeModuleLoader, chunkFileName)}");`;
      };
      await Promise.all(
        bundles.map(async (name) => {
          const chunk = output[name];
          if (chunk.type === "chunk") {
            let _code = chunk.code;
            if (bytecodeRE && _code.match(bytecodeRE)) {
              let match;
              const s = new MagicString(_code);
              while (match = bytecodeRE.exec(_code)) {
                const [prefix, chunkName] = match;
                const len = prefix.length + chunkName.length;
                s.overwrite(match.index, match.index + len, prefix + chunkName + "c", {
                  contentOnly: true
                });
              }
              _code = s.toString();
            }
            const chunkFileName = path3.resolve(outDir, name);
            if (bytecodeChunks.includes(name)) {
              const bytecodeBuffer = await compileToBytecode(_code);
              fs2.writeFileSync(path3.resolve(outDir, name + "c"), bytecodeBuffer);
              if (chunk.isEntry) {
                if (!removeBundleJS) {
                  keepBundle(chunkFileName);
                }
                const bytecodeLoaderBlock = getBytecodeLoaderBlock(chunk.fileName);
                const bytecodeModuleBlock = `require("./${path3.basename(name) + "c"}");`;
                const code = `${useStrict}
${bytecodeLoaderBlock}
${bytecodeModuleBlock}
`;
                fs2.writeFileSync(chunkFileName, code);
              } else {
                if (removeBundleJS) {
                  fs2.unlinkSync(chunkFileName);
                } else {
                  keepBundle(chunkFileName);
                }
              }
              bytecodeFiles.push({ name: name + "c", size: bytecodeBuffer.length });
            } else {
              if (chunk.isEntry) {
                let hasBytecodeMoudle = false;
                const idsToHandle = /* @__PURE__ */ new Set([...chunk.imports, ...chunk.dynamicImports]);
                for (const moduleId of idsToHandle) {
                  if (bytecodeChunks.includes(moduleId)) {
                    hasBytecodeMoudle = true;
                    break;
                  }
                  const moduleInfo = this.getModuleInfo(moduleId);
                  if (moduleInfo && !moduleInfo.isExternal) {
                    const { importers, dynamicImporters } = moduleInfo;
                    for (const importerId of importers)
                      idsToHandle.add(importerId);
                    for (const importerId of dynamicImporters)
                      idsToHandle.add(importerId);
                  }
                }
                const bytecodeLoaderBlock = getBytecodeLoaderBlock(chunk.fileName);
                _code = hasBytecodeMoudle ? _code.replace(useStrict, `${useStrict}
${bytecodeLoaderBlock}`) : _code;
              }
              fs2.writeFileSync(chunkFileName, _code);
            }
          }
        })
      );
    },
    closeBundle() {
      if (!useInRenderer) {
        const chunkLimit = config.build.chunkSizeWarningLimit;
        const outDir = normalizePath(path3.relative(config.root, path3.resolve(config.root, config.build.outDir))) + "/";
        config.logger.info(`${colors.green(`\u2713`)} ${bytecodeFiles.length} bundles compiled into bytecode.`);
        let longest = 0;
        bytecodeFiles.forEach((file) => {
          const len = file.name.length;
          if (len > longest)
            longest = len;
        });
        bytecodeFiles.forEach((file) => {
          const kbs = file.size / 1e3;
          config.logger.info(
            `${colors.gray(colors.white(colors.dim(outDir)))}${colors.green(file.name.padEnd(longest + 2))} ${kbs > chunkLimit ? colors.yellow(`${kbs.toFixed(2)} kB`) : colors.dim(`${kbs.toFixed(2)} kB`)}`
          );
        });
        bytecodeFiles = [];
      }
    }
  };
}

// electron.vite.config.ts
import react from "@vitejs/plugin-react";
var electron_vite_config_default = defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src")
      }
    },
    plugins: [react()]
  }
});
export {
  electron_vite_config_default as default
};
