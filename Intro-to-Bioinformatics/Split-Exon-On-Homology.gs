"use strict"

//splits a given exon into component homologies based on inputs set in declareExonComponents()
//makes new GDocs containing individual exon components for easy manipulation
function run() {
  declareExonComponents();
  
  //place gene component objects into array for looping
  var exonCompArray = [extra, ex1a, ex1b];
  
  splitExonIntoComponents(exonCompArray);
  for (var arrInd=1; arrInd<exonCompArray.length; arrInd++) { 
    makeNewGSheetFromVar(exonCompArray[arrInd].compName, exonCompArray[arrInd].sequence);
  }
  
}

function makeNewGSheetFromVar(docName, docContents) {
  var doc = doc = DocumentApp.create(docName);
  var body = doc.getBody();
  var text = body.editAsText();
  text.appendText(docContents);
  doc = DriveApp.getFileById(doc.getId());
  DriveApp.getFolderById('insert output folder id here').addFile(doc);
  DriveApp.getRootFolder().removeFile(doc);
  
}

function splitExonIntoComponents(exonCompArray) {
  //open doc gene seq is stored in, store seq in local var
  var geneDoc = DocumentApp.openById('insert doc id here');
  var geneDocContents = geneDoc.getBody().getText();
  
  //loop over array
  for (var arrInd=1; arrInd<exonCompArray.length; arrInd++) {
    if (exonCompArray[arrInd].sequence === undefined) {
      var tmp = '';
      for (var i=exonCompArray[arrInd-1].indexEnd; i<exonCompArray[arrInd].indexEnd; i++) {
        tmp+=geneDocContents.charAt(i); 
      }
      exonCompArray[arrInd].sequence = tmp.substr(0);
      tmp = '';
    }
  }
  
}

var ExonComp = function(compName, indexEnd) {
  this.compName = compName;
  this.indexEnd = indexEnd;
  this.sequence = undefined;
  
}

function declareExonComponents() {
  
  extra = new ExonComp('extra', 0);
  ex1a = new ExonComp('ex1a', 424); 
  ex1b = new ExonComp('ex1b', 510);
  
  return extra, ex1a, ex1b;
  
}
