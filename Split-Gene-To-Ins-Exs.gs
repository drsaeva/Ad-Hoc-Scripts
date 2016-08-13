"use strict"

//Google script to split a gene found in a Gdoc into component introns/exons based on delineations provided in the assignment
//Split intron/exons are then pushed into new Gdocs generated ad-hoc in a specified folder

//Controller/run function. Execute this to run everything
function run() {
  declareGeneComponents();
  
  //place gene component objects into array for looping
  var geneCompArray = [extra, ex1, in1, ex2, in2, ex3, in3, ex4, in4, ex5];
  
  splitGeneintoComponents(geneCompArray);
  for (var arrInd=1; arrInd<geneCompArray.length; arrInd++) { 
    makeNewGSheetFromVar(geneCompArray[arrInd].compName, geneCompArray[arrInd].sequence);
  }
  
}

//Create ad-hoc Gdoc with passed in name and contents at specified location
//Feel free to refactor with the output folder's Id as a passed argument
function makeNewGSheetFromVar(docName, docContents) {
  var doc = doc = DocumentApp.create(docName);
  var body = doc.getBody();
  var text = body.editAsText();
  text.appendText(docContents);
  doc = DriveApp.getFileById(doc.getId());
  DriveApp.getFolderById('Add GDrive Output Folder Id Here').addFile(doc);
  DriveApp.getRootFolder().removeFile(doc);
  
}

//Iterate over array containing intron/exon object references, splitting intron/exon sequences off from the source document
//  and storing the sequence as the associated object's property
//Feel free to refactor with the source doc's Id as a passed argument
function splitGeneintoComponents(geneCompArray) {
  //open doc gene seq is stored in, store seq in local var
  var geneDoc = DocumentApp.openById('Add source Gdoc Id Here');
  var geneDocContents = geneDoc.getBody().getText();
  
  //loop over array
  for (var arrInd=1; arrInd<geneCompArray.length; arrInd++) {
    if (geneCompArray[arrInd].sequence === undefined) {
      var tmp = '';
      for (var i=geneCompArray[arrInd-1].indexEnd; i<geneCompArray[arrInd].indexEnd; i++) {
        tmp+=geneDocContents.charAt(i); 
      }
      geneCompArray[arrInd].sequence = tmp.substr(0);
      tmp = '';
    }
  }
  
}

//Constructor for intron/exon objects
var geneComp = function(compName, indexEnd) {
  this.compName = compName;
  this.indexEnd = indexEnd;
  this.sequence = undefined;
  
}

//Generate a bunch of gene introns/exon objects with predetermined endpoints

function declareGeneComponents() {
  extra = new geneComp('extra', 0);
  ex1 = new geneComp('ex1', 510); 
  in1 = new geneComp('in1', 1400);
  ex2 = new geneComp('ex2', 1640);
  in2 = new geneComp('in2', 2298);
  ex3 = new geneComp('ex3', 2538);
  in3 = new geneComp('in3', 2940);
  ex4 = new geneComp('ex4', 3081);
  in4 = new geneComp('in4', 3671);
  ex5 = new geneComp('ex5', 5121);
  return extra, ex1, in1, ex2, in2, ex3, in3,ex4, in4, ex5;
  
}
