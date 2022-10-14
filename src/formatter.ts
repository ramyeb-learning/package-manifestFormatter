import Ajv from "ajv"
import SchemaJSON from './schema.json'
var clc = require("cli-color");

var error = clc.redBright;
var success = clc.greenBright;

type VerifyManifestParams = {
    details?: boolean, 
    steps?: boolean, 
    enableState?: boolean, 
    fileName?: string
}

export const verifyManifest = (manifest: JSON, {details, steps, enableState, fileName}: VerifyManifestParams ): boolean =>  {
    const ajv = new Ajv({allErrors: !steps})
    const validate = ajv.compile(SchemaJSON)

    if(validate(manifest)){
        console.log(success(fileName))
        enableState && console.log(success("No errors detected"))
        return true
    }
    !!fileName && console.log(error(fileName))
    if (details) {
        console.log(`${validate.errors?.length} errors detected :`)
        validate.errors?.map(e => {
            console.log(`-----\nWhere ? ${e.instancePath ? e.instancePath : "root"} \nMessage : ${e.message}`)
        })
    }else{
        enableState && console.log("The JSON file do not correspond to the schema")
    }
    return false
}