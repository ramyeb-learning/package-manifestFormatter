#!/usr/bin/env node 
import * as fs from 'fs';
import path from 'path';
import {verifyManifest} from "./formatter"

const verifyManifestFromCLI = (): void | never => {
    try {
    if(process.argv[2] != undefined){

        let details = process.argv.includes('-details')
        let steps = process.argv.includes('-steps')
        let enableState = process.argv.includes('-disableState')
        fs.readdir(process.argv[2], (err, files) => {
            files.forEach(fileName => {
               if(!verifyManifest(JSON.parse(fs.readFileSync(path.join(process.cwd(),process.argv[2],fileName), 'utf-8')), {details, steps, enableState, fileName})){
                throw new Error("The JSON file : " + fileName + " do not correspond to the schema");
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