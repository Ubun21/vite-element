import { defineComponent, PropType } from "vue";
import "uno.css";

export type IColor =
  | "black"
  | "gray"
  | "red"
  | "yellow"
  | "green"
  | "blue"
  | "indigo"
  | "purple"
  | "pink";
export type Icon =
  | "search"
  | "edit"
  | "check"
  | "message"
  | "star-off"
  | "delete"
  | "add"
  | "share"
  | "";
export type ISize = "small" | "medium" | "large";
export const props = {
  color: {
    type: String as PropType<IColor>,
    default: "blue",
  },

  icon: {
    type: String as PropType<Icon>,
    default: "",
  },

  size: {
    type: String as PropType<ISize>,
    default: "medium",
  },

  round: {
    type: Boolean,
    default: false,
  },

  plain: {
    type: Boolean,
    default: false,
  },
};
export default defineComponent({
  name: "SFCButton",
  props,
  setup(props, { slots }) {
    const size = {
      small: {
        x: "2",
        y: "1",
        text: "sm",
      },
      medium: {
        x: "3",
        y: "2",
        text: "base",
      },
      large: {
        x: "4",
        y: "2",
        text: "lg",
      },
    };

    return () => (
      <button
        class={`
      py-${size[props.size].y}
      px-${size[props.size].x}
      font-semibold 
      ${props.round ? "rounded-full" : "rounded-lg"}
      bg-${props.color}-${props.plain ? "100" : "500"}
      hover:bg-${props.color}-400
      border-${props.color}-${props.plain ? "500" : "500"}
      shadow-md 
      text-white 
      bg-${props.color}-500 
      hover:text-white
      border-none 
      cursor-pointer 
      `}
      >
        {props.icon !== "" ? (
          <i class={`i-ic-baseline-${props.icon} p-3`}></i>
        ) : (
          ""
        )}
        {slots.default ? slots.default() : ""}
      </button>
    );
  },
});
