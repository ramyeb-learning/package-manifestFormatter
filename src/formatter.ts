import Ajv from "ajv"
import SchemaJSON from './schema.json'

type VerifyManifestParams = {
    details?: boolean, steps?: boolean, disableState?: boolean
}

export const verifyManifest = (manifest: JSON, {details, steps, disableState}: VerifyManifestParams ): boolean =>  {
    const ajv = new Ajv({allErrors: !steps})
    const validate = ajv.compile(SchemaJSON)

    if(validate(manifest)){
        !disableState && console.log("No errors detected")
        return true
    }
    if (details) {
        console.log(`${validate.errors?.length} errors detected :`)
        validate.errors?.map(e => {
            console.log(`-----\nWhere ? ${e.instancePath ? e.instancePath : "root"} \nMessage : ${e.message}`)
        })
    }else{
        !disableState && console.log("The JSON file do not correspond to the schema")
    }
    return false
}