const child_process = require("child_process"), fs = require("fs")

let fileInfo = {},
    childProductVersion = child_process.spawnSync(
        "powershell.exe",
        ["(Get-Item -path D:\\revota\\travics_erigo\\dist_v47\\source\\Source-ErigoDist_v47\\api\\tito_sap\\--tito_sap.exe).VersionInfo.ProductVersion"],
        { encoding: "utf8" }
    ),
    childFileVersion = child_process.spawnSync(
        "powershell.exe",
        ["(Get-Item -path D:\\revota\\travics_erigo\\dist_v47\\source\\Source-ErigoDist_v47\\api\\tito_sap\\--tito_sap.exe).VersionInfo.FileVersion"],
        { encoding: "utf8" }
    ),
    childFileName = child_process.spawnSync(
        "powershell.exe",
        ["(Get-Item -path D:\\revota\\travics_erigo\\dist_v47\\source\\Source-ErigoDist_v47\\api\\tito_sap\\--tito_sap.exe).VersionInfo.FileName"],
        { encoding: "utf8" }
    ),
    childLastModified = child_process.spawnSync(
        "powershell.exe",
        ["(Get-ChildItem -path D:\\revota\\travics_erigo\\dist_v47\\source\\Source-ErigoDist_v47\\api\\tito_sap\\--tito_sap.exe).LastWriteTime"],
        { encoding: "utf8" }
    )

fileInfo.product_version = childProductVersion.stdout.toString().replace("\r\n", "")
fileInfo.file_version = childFileVersion.stdout.toString().replace("\r\n", "")
fileInfo.file_name = childFileName.stdout.toString().replace("\r\n", "").replace(/\\/g, "/")
fileInfo.last_modified = new Date(childLastModified.stdout.replace(/\r\n/g, "")).toLocaleString("sv-SE")

fs.writeFileSync("./file_info.json", JSON.stringify(fileInfo))