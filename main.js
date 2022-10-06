const child_process = require("child_process"), fs = require("fs")

let file_info = {},
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
        ["Get-ChildItem -path D:\\revota\\travics_erigo\\dist_v47\\source\\Source-ErigoDist_v47\\api\\tito_sap\\--tito_sap.exe | Select-Object @{n='LastWriteTime';e={'{0:yyyy-MM-dd HH:mm:ss}' -f $_.LastWriteTime}}"],
        { encoding: "utf8" }
    )

file_info.product_version = childProductVersion.stdout.trim()
file_info.file_version = childFileVersion.stdout.trim()
file_info.file_name = childFileName.stdout.trim().replace(/\\/g, "/")
file_info.last_modified = childLastModified.stdout.trim().replace("LastWriteTime      \r\n-------------      \r\n", "")

console.log(file_info)

fs.writeFileSync("./file_info.json", JSON.stringify(file_info))