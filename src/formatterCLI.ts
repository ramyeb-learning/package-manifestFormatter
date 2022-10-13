import * as fs from 'fs';
import path from 'path';
import {verifyManifest} from "./formatter"

if(process.argv[2] != undefined){
    const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(),process.argv[2]), 'utf-8'));
    let details = process.argv.includes('-details')
    let steps = process.argv.includes('-steps')
    let disableState = process.argv.includes('-disableState')
    verifyManifest(manifest, {details, steps, disableState})
}