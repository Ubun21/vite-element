/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line vue/prefer-import-from-vue
import { hasOwn, isObject } from "@vue/shared";
import { PropType, warn } from "vue";
import { fromPairs } from "lodash";
import {
  EpProp,
  EpPropMergeType,
  EpPropInput,
  EpPropFinalized,
  NativePropType,
  IfEpProp,
  IfNativePropType,
  EpPropConvert,
} from "./props";

export const epPropKey = "__epPropKey";

export const definePropType = <T>(val: any): PropType<T> => val;

export const isEpPron = (val: unknown): val is EpProp<any, any, any> =>
  isObject(val) && !!(val as any)[epPropKey];

export const buildProp = <
  Type = never,
  Value = never,
  Validate = never,
  Default extends EpPropMergeType<Type, Value, Validate> = never,
  Required extends boolean = false
>(
  prop: EpPropInput<Type, Value, Validate, Default, Required>,
  key?: string
): EpPropFinalized<Type, Value, Validate, Default, Required> => {
  if (!isObject(prop) || isEpPron(prop)) return prop as any;
  const { type, values, validator, default: defaultValue, required } = prop;
  const __validator =
    values || validator
      ? (val: unknown) => {
          let valid = false;
          let allowValues: unknown[] = [];
          if (values) {
            allowValues = Array.from(values);
            if (hasOwn(prop, "default")) {
              allowValues.push(defaultValue);
            }
            valid ||= allowValues.includes(val);
          }
          if (validator) valid ||= validator(val);

          if (!valid && allowValues.length > 0) {
            const allowValuesText = [...new Set(allowValues)]
              .map((val) => JSON.stringify(val))
              .join(", ");
            warn(
              `Invalid prop: validation failed${
                key ? ` for prop "${key}"` : ""
              }. Expected one of [${allowValuesText}], got value ${JSON.stringify(
                val
              )}.`
            );
          }

          return valid;
        }
      : undefined;
  const eProp: any = {
    type,
    required: !!required,
    validator: __validator,
    [epPropKey]: true,
  };
  if (hasOwn(prop, "default")) eProp.default = defaultValue;
  return eProp;
};

export const buildProps = <
  Props extends Record<
    string,
    | { [epPropKey]: true }
    | NativePropType
    | EpPropInput<any, any, any, any, any>
  >
>(
  props: Props
): {
  [K in keyof Props]: IfEpProp<
    Props[K],
    Props[K],
    IfNativePropType<Props[K], Props[K], EpPropConvert<Props[K]>>
  >;
} =>
  fromPairs(
    Object.entries(props).map(([key, options]) => [
      key,
      buildProp(options as any, key),
    ])
  ) as any;
