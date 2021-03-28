type ComponentTitle = {
  readonly title: string;
};

interface MediaComponent extends ComponentTitle {
  url: string;
}

interface TextComponent extends ComponentTitle {
  body: string;
}

// class ComponentDataMapper implements COMPONENT_DATA {
//   readonly title: string;
//   readonly value: COMPONENT_VALUE;
//   constructor(title: string, value: COMPONENT_VALUE) {
//     this.title = title;
//     this.value = value;
//   }
// }

interface Component<D> {
  setData(data: D): void;
  getData(): D;
}

class ComponentImpl<D> implements Component<D> {
  private data?: D;
  setData(data: D): void {
    this.data = data;
  }
  getData(): D {
    if (this.data) {
      return this.data;
    } else {
      throw new Error("Empty Data");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const HEADER_BTN_WRAPPER = document.querySelector(".header--btns");
  const COMPONENT = new ComponentImpl<COMPONENT_DATA>();
  // const MODAL_WINDOW: Element | null = document.querySelector(".modal--bg");
  HEADER_BTN_WRAPPER?.addEventListener("click", (e: Event) => {
    let element = e.target as Element;
    if (element.classList.contains("btn--add")) {
      switch (element.textContent) {
        case "IMAGE":
        case "VIDEO":
          //showModal(
          COMPONENT.setData({ title: "title", value: "URL" });
          // MODAL_WINDOW as Element
          //);
          break;
        case "NOTE":
        case "TASK":
          // showModal(
          COMPONENT.setData({ title: "title", value: "BODY" });
          // MODAL_WINDOW as Element
          // );
          break;
        default:
          throw new Error("unexpected click event");
      }
    }
  });
});

// function showModal<D>(data: D, MODAL_WINDOW: Element) {}
