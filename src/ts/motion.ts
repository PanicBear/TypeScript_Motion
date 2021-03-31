// type COMPONENT_DATA = {
//   readonly title: string;
//   readonly url?: string;
//   readonly body?: string;
// };

// type MEDIA_COMPONENT = Pick<COMPONENT_DATA, "title" | "url">;
// type TEXT_COMPONENT = Pick<COMPONENT_DATA, "title" | "body">;

type MODAL_VALUE = "URL" | "Body";
type MODAL_STATE = {
  componentType: COMPONENT_TYPE;
  titleInput: string;
  valueTitle: MODAL_VALUE;
  valueInput: string;
};
type COMPONENT_TYPE = "IMAGE" | "VIDEO" | "NOTE" | "TASK";

// class Component<D> {
//   constructor(private data: D) {}

//   getData(): D {
//     if ("body" in this.data) {
//       console.log("MEDIA");
//       return this.data as D;
//     } else if ("url" in this.data) {
//       console.log("TEXT");
//       return this.data as D;
//     } else {
//       throw new Error("undefined component");
//     }
//   }
// }

class Component {
  private state: Omit<MODAL_STATE, "valueTitle"> = {
    componentType: "IMAGE",
    titleInput: "",
    valueInput: "",
  };

  constructor(private section: Element) {}

  private setState(param: Omit<MODAL_STATE, "valueTitle">) {
    this.state = { ...this.state, ...param };
  }

  addComponent(input: Omit<MODAL_STATE, "valueTitle">) {
    this.setState(input);
    this.section.innerHTML += this.parseValue(input); // << URL 파싱

    //   this.section.innerHTML += `
    //   <div class="component component--text">
    //     <div class="text">
    //       <div class="text--wrapper">
    //         <p class="text--title title">${input.titleInput}</p>
    //         <input type="checkbox" name="checkbox" />
    //         <label class="text--list" for="checkbox">${input.valueInput}</label>
    //       </div>
    //       <div class="btn--close">
    //         <i class="fas fa-times"></i>
    //       </div>
    //     </div>
    //   </div>
    // `;
  }
  parseValue(input: Pick<MODAL_STATE, "valueInput">): string {
    let html = "";
    switch (this.state.componentType) {
      case "IMAGE":
        html = `<div class="component component--media">
        <div class="media">
          <img src="${this.state.valueInput}" alt="img" />
        </div>
        <div class="paragraph">
          <div class="text--wrapper">
            <p class="text--title title">Dream Coding</p>
          </div>
          <div class="btn--close">
            <i class="fas fa-times"></i>
          </div>
        </div>
      </div>`;
        break;
      case "VIDEO":
        html = `<div class="component component--media">
        <div class="media">
          <iframe src="${this.state.valueInput}" alt="video thumbnail" />
        </div>
        <div class="paragraph">
          <div class="text--wrapper">
            <p class="text--title title">Dream Coding</p>
          </div>
          <div class="btn--close">
            <i class="fas fa-times"></i>
          </div>
        </div>
      </div>`;
        break;
      case "NOTE":
        html = `<div class="component component--text">
        <div class="paragraph">
          <div class="text--wrapper">
            <p class="text--title title">${this.state.titleInput}</p>
            <p class="text--list">${this.state.valueInput}</p>
          </div>
          <div class="btn--close">
            <i class="fas fa-times"></i>
          </div>
        </div>
      </div>`;
        break;
      case "TASK":
        html = `<div class="component component--text">
        <div class="paragraph">
          <div class="text--wrapper">
            <p class="text--title title">${this.state.titleInput}</p>
            <input type="checkbox" name="checkbox" />
            <label class="text--list" for="checkbox">${this.state.valueInput}</label>
          </div>
          <div class="btn--close">
            <i class="fas fa-times"></i>
          </div>
        </div>
      </div>`;
        break;
      default:
        throw new Error("unable to parse Value");
    }
    return html;
  }
}

class Modal {
  private state: MODAL_STATE = {
    componentType: "IMAGE",
    titleInput: "",
    valueTitle: "URL",
    valueInput: "",
  };

  private valueLabel: Element = this.MODAL_BG.querySelector(
    ".window--value__label"
  ) as Element;
  private titleInput: HTMLInputElement = this.MODAL_BG.querySelector(
    ".window--title__input"
  ) as HTMLInputElement;
  private valueInput: HTMLInputElement = this.MODAL_BG.querySelector(
    ".window--value__textarea"
  ) as HTMLInputElement;

  constructor(private MODAL_BG: Element, private component: Component) {
    this.initBtnEvent();
  }

  private initBtnEvent() {
    this.MODAL_BG.addEventListener("click", (e: Event) => {
      let target: Element = e.target as Element;
      let filters: string[] = ["modal--bg", "btn--close", "fa-times"];
      let isCancled: boolean = filters.some((filter) => {
        return target.classList.contains(filter);
      });

      if (isCancled) {
        this.hideModal();
      } else if (target.classList.contains("btn--add")) {
        this.setState({
          titleInput: this.titleInput.value,
          valueInput: this.valueInput.value,
        });
        console.log(this.state);
        this.component.addComponent(this.state);
        this.hideModal();
      }
    });
  }

  private setState(param: Partial<MODAL_STATE>) {
    this.state = { ...this.state, ...param };
  }

  private resetModal() {
    // switch는 show & hide 있고
    // valueTitle은 띄울 때 초기화되기에 상관없음
    this.setState({
      titleInput: "",
      valueInput: "",
    });

    this.titleInput.value = this.state.titleInput;
    this.valueInput.value = this.state.valueInput;
  }

  showModal(component: COMPONENT_TYPE) {
    this.resetModal();

    switch (component) {
      case "IMAGE":
      case "VIDEO":
        this.setState({ componentType: component, valueTitle: "URL" });
        break;
      case "NOTE":
      case "TASK":
        this.setState({ componentType: component, valueTitle: "Body" });
        break;
      default:
        throw new Error("error with create modal");
    }

    this.valueLabel.textContent = this.state.valueTitle;
    this.MODAL_BG.classList.remove("modal-hide");
    this.MODAL_BG.classList.add("modal-show");
  }

  hideModal() {
    this.MODAL_BG.classList.add("modal-hide");
    this.MODAL_BG.classList.remove("modal-show");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const HEADER_BTN_WRAPPER = document.querySelector(".header--btns");
  const MODAL_BG: Element | null = document.querySelector(".modal--bg");
  const COMPONENT: Component = new Component(
    document.querySelector(".components") as Element
  );
  // const MODAL_BTN_ADD: Element | null = document.querySelector(".btn--add");
  // const MODAL_BTN_CLOSE: Element | null = document.querySelector(".btn--close");

  let modal = new Modal(MODAL_BG as Element, COMPONENT);

  HEADER_BTN_WRAPPER?.addEventListener("click", (e: Event) => {
    let element = e.target as Element;
    if (element.classList.contains("btn--add")) {
      console.log(element.textContent);
      modal.showModal(element.textContent as COMPONENT_TYPE);
    }
  });
});
