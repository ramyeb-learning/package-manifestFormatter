import * as fs from 'fs';
import path from 'path';
import {verifyManifest} from "./formatter"

const verifyManifestFromCLI = (): void | never => {
    try {
    if(process.argv[2] != undefined){

        let details = process.argv.includes('-details')
        let steps = process.argv.includes('-steps')
        let disableState = process.argv.includes('-disableState')
        fs.readdir(process.argv[2], (err, files) => {
            files.forEach(file => {
                console.log("------"+file+"------")
               if(!verifyManifest(JSON.parse(fs.readFileSync(path.join(process.cwd(),process.argv[2],file), 'utf-8')), {details, steps, disableState})){
                throw new Error("The JSON file : " + file +" do not correspond to the schema");
               }
            })
          })
    }else{
        throw new Error("Please specify the manifests directory");
    }
    }catch(e){
        console.log(e) 
    }
}

verifyManifestFromCLI();