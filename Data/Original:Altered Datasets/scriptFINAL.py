#uottahack: NOBULLY
#feb 8, 2019
#converts train_altered.csv to a format suitable for autoML import

import sys
import os

fileName = "/Users/KylePinkerton/Desktop/uottawahack/train_altered.csv"
numberOfComments=0
organizedData = open("trainv2.csv", "w+", encoding="utf-8")
numberOfLinesWritten = 0 
#COLUMNS
#id, comment_text, toxic, severe_toxic, obscene, threat, insult, identity_hate
#write titles
organizedData.write("Comment" + "," + "Polarity" + "\n")
numberOfLinesWritten+=1

try:
    data= []
    with open(fileName, 'r+', encoding='utf-8') as f: #r+ doesn't delete the content of the file and doesn't create a new file if such file doesn't exist, encoding='utf-8' needed for proper reading of file
        #skip column header
        next(f)
        for line in f:
            #we don't want id included
            indexSplit = line.find(",")
            lineInfo = line[indexSplit+1:]
            listLineInfo = lineInfo.split(",")           
            data.append(listLineInfo)
            #each line will be separated in the following manner:
            #[comment_text, toxic, severe_toxic, obscene, threat, insult, identity_hate]
            numberOfComments += 1

        for i in range(0, len(data)):
            #comments can have newlines, we don't want that
            comment_text = data[i][0]              
            toxic = data[i][1]
            severe_toxic = data[i][2]
            obscene = data[i][3]
            threat = data[i][4]
            insult = data[i][5]
            identity_hate = data[i][6]

            #how many "1s" we have
            numberOfOnes = 0
            #entries corresponding to "1"
            listOfOneEntries = []
            #used to fill in list of entries with corresponding labels
            correspondingEntryList = {1: "toxic", 2: "severe_toxic", 3 : "obscene", 4 :"threat", 5 : "insult", 6 : "identity_hate"}

            #if no entrys have a "1' we must simply go to nextline
            for k in range (1, len(data[i])): #starting from 1, bcuz we dont want to detect "1" in comment_text
                if "1" == data[i][k]:
                    numberOfOnes += 1
                    #print(len(data[i]))
                    #print(data[i])
                    #print(k)
                    listOfOneEntries.append(correspondingEntryList[k])

            if numberOfOnes > 0:
                organizedData.write(comment_text + "," + "Toxic" + "\n")
                numberOfLinesWritten+=1
    
            else:
                organizedData.write(comment_text + "," + "Non-toxic" + "\n")
                numberOfLinesWritten+=1
                
            
           

except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)

organizedData.close()
print("complete")
print("number of comments: ", numberOfComments)
print("number of lines written:", numberOfLinesWritten)
#159572 lines (including column header)
        
            
            
            
            
