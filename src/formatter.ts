import Ajv from "ajv"
import SchemaJSON from './schema.json'

export const verifyManifest = async (manifest: JSON, options: {details: boolean, showErrorsStepByStep?: boolean}) => {
    const ajv = new Ajv({allErrors: !options.showErrorsStepByStep})
    const validate = ajv.compile(SchemaJSON)

    if(validate(manifest)){
        console.log("No errors detected")
    }else{
        if (options.details) {
            console.log(`${validate.errors?.length} errors detected :`)
            validate.errors?.map(e => {
                console.log(`-----\nWhere ? ${e.instancePath ? e.instancePath : "root"} \nMessage : ${e.message}`)
            })
        }else{
            console.log("Not Correct")
        }
    }
   
}