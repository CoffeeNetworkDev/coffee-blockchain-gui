const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('Creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds')

  const appName = "Coffee"

  return Promise.resolve({
    appDirectory: path.join(rootPath, appName + '-win32-x64'),
    authors: appName + ' Network',
    version: process.env.COFFEE_INSTALLER_VERSION,
    noMsi: true,
    iconUrl: 'https://raw.githubusercontent.com/coffee-network/coffee-blockchain-gui/main/src/assets/img/coffee.ico',
    outputDirectory: path.join(outPath, 'windows-installer'),
    certificateFile: 'win_code_sign_cert.p12',
    certificatePassword: process.env.WIN_CODE_SIGN_PASS,
    exe: appName + '.exe',
    setupExe: appName + 'Setup-' + process.env.COFFEE_INSTALLER_VERSION + '.exe',
    setupIcon: path.join(rootPath, 'src', 'assets', 'img', 'coffee.ico')
  })
}
