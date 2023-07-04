import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { TipoParteCuerpo } from "src/Note/domain/value_objects/Cuerpo_VO/TipoParteCuerpo";

@ValidatorConstraint({ name: 'BodyPartType', async: true })
@Injectable()
export class BodyPartType implements ValidatorConstraintInterface {

  async validate(value: string) {
    try {
        let valid:boolean = false;
        let first:boolean = true;
        for (const tipo of Object.keys(TipoParteCuerpo)) {
            if ((value == TipoParteCuerpo[tipo]) && (first)){
                valid = true;
                first = false;
            }          
        }
        if (!valid){
            return false;
        }
    } catch (e) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Not a valid BodyPartType';
  }
}