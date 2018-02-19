var folderId = "";
var faviconUrl = "favicon.ico"
var folderPath = [["マイドライブ", DriveApp.getRootFolder().getId()]];

//html表示
function doGet(e) {
  Logger.log( Utilities.jsonStringify(e) );

  if (!e.parameter.page) {
      Logger.log("画面起動");
      return HtmlService.createTemplateFromFile('page').evaluate().setTitle("マイドライブ - Google ドライブ").setFaviconUrl(faviconUrl);
  }
    Logger.log("画面遷移");
  //パラメータidを受け取る
  folderId = e.parameter['id'];
  
  var html = HtmlService.createTemplateFromFile(e.parameter['page']).evaluate();
  return html.setTitle(DriveApp.getFolderById(folderId).getName() + " - Google ドライブ").setFaviconUrl(faviconUrl);
}

function include(filename) {
  var css = HtmlService.createHtmlOutputFromFile(filename);
  return css.getContent();
}

//ルートフォルダのファイル/フォルダを取得する
function getRootAll() {
  var folders = getRootFolder();
  var files = getRootFile();

  return folders.concat(files);
}

//ルートフォルダのフォルダを取得する
function getRootFolder() {
  var folderIterator = DriveApp.getRootFolder().getFolders();
  var folders = [];
  var i = 0;
  
  while(folderIterator.hasNext()) {
    var folder = folderIterator.next()
    var name = folder.getName();
    var id = folder.getId();
    
    folders[i] = [name, id, "folder"];
    i++;
  }
  return folders;
}

//ルートフォルダのファイルを取得する
function getRootFile() {
  var fileIterator = DriveApp.getRootFolder().getFiles();
  var files = [];
  var i = 0;
  
  while(fileIterator.hasNext()) {
    var file = fileIterator.next()
    var name = file.getName();
    var url = file.getUrl();
    
    files[i] = [name, url, "file"];
    i++;
  }
  return files;
}

//指定されたIDのファイル/フォルダを取得する
function getAll(folderId) {
  var folders = getFolder(folderId);
  var files = getFile(folderId);

  return folders.concat(files);
}

//指定されたIDのフォルダを取得する
function getFolder(folderId) {
  var folderIterator = DriveApp.getFolderById(folderId).getFolders();
  var folders = [];
  var i = 0;
  
  while(folderIterator.hasNext()) {
    var folder = folderIterator.next()
    var name = folder.getName();
    var id = folder.getId();
    
    folders[i] = [name, id, "folder"];
    i++;
  }
  return folders;
}

//指定されたIDのファイルを取得する
function getFile(folderId) {
  var fileIterator = DriveApp.getFolderById(folderId).getFiles();
  var files = [];
  var i = 0;
  
    while(fileIterator.hasNext()) {
    var file = fileIterator.next()
    var name = file.getName();
    var url = file.getUrl();
    
    files[i] = [name, url, "file"];
    i++;
  }
  return files;
}

//遷移するフォルダIDを取得する
function getFolderId() {
  return folderId;
}

//辿ったフォルダのパスを取得する
function getFolderPath() {
  return folderPath;
}

//ファイルを新規作成する

function getScriptUrl() {
    var url = ScriptApp.getService().getUrl();
    console.log("getScriptUrl()", url);
    return url;
}
















