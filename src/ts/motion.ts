type COMPONENT_DATA = {
  readonly title: string;
  readonly url?: string;
  readonly body?: string;
};

type MEDIA_COMPONENT = PICK<COMPONENT_DATA, "title" | "url">;
type TEXT_COMPONENT = PICK<COMPONENT_DATA, "title" | "body">;

type PICK<T, K extends keyof T> = {
  [P in K]: T[P];
};

// class Component {
//   constructor(private data: COMPONENT_DATA) {}

//   getData(): MEDIA_COMPONENT | TEXT_COMPONENT {
//     if ("body" in this.data) {
//       console.log("MEDIA");
//       return this.data as MEDIA_COMPONENT;
//     } else if ("url" in this.data) {
//       console.log("TEXT");
//       return this.data as TEXT_COMPONENT;
//     } else {
//       throw new Error("undefined component");
//     }
//   }
// }

class Component<D> {
  constructor(private data: D) {}

  getData(): D {
    if ("body" in this.data) {
      console.log("MEDIA");
      return this.data as D;
    } else if ("url" in this.data) {
      console.log("TEXT");
      return this.data as D;
    } else {
      throw new Error("undefined component");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const HEADER_BTN_WRAPPER = document.querySelector(".header--btns");
  const MODAL_WINDOW: Element | null = document.querySelector(".modal--bg");
  HEADER_BTN_WRAPPER?.addEventListener("click", (e: Event) => {
    let element = e.target as Element;
    let component;
    if (element.classList.contains("btn--add")) {
      console.log(element.textContent);
      switch (element.textContent) {
        case "IMAGE":
        case "VIDEO":
          console.log(
            showModal(
              (component = new Component({ title: "title", url: "URL" })),
              MODAL_WINDOW as Element
            )
          );
          break;
        case "NOTE":
        case "TASK":
          console.log(
            showModal(
              (component = new Component({ title: "title", body: "BODY" })),
              MODAL_WINDOW as Element
            )
          );
          showModal(
            (component = new Component({ title: "title", body: "BODY" })),
            MODAL_WINDOW as Element
          );
          break;
        default:
          throw new Error("unexpected click event");
      }
    }
  });
});

function showModal<D>(data: D, MODAL_WINDOW: Element): D {
  let MODAL_VALUE_LABLE: Element | null = MODAL_WINDOW.querySelector(
    ".window--value__label"
  );
  (MODAL_VALUE_LABLE as Element).textContent = "url" in data ? "URL" : "Body";

  return data;
}
