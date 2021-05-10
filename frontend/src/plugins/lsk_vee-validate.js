import { extend } from "vee-validate";
import { regex, required, integer } from "vee-validate/dist/rules";

extend("regex", regex);
extend("required", required);
extend("integer", integer);
