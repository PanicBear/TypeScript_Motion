type PICK<T, K extends keyof T> = {
  [P in K]: T[P];
};

type COMPONENT_DATA = {
  readonly title: string;
  readonly url?: string;
  readonly body?: string;
};

type MEDIA_COMPONENT = PICK<COMPONENT_DATA, "title" | "url">;
type TEXT_COMPONENT = PICK<COMPONENT_DATA, "title" | "body">;

type MODAL_SWITCH = "HIDE" | "SHOW";
type MODAL_VALUE = "URL" | "Body";
type MODAL_STATE = {
  switch: MODAL_SWITCH;
  titleInput: string;
  valueTitle: MODAL_VALUE;
  valueInput: string;
};

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

class Modal {
  private state: MODAL_STATE = {
    switch: "HIDE",
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

  constructor(private MODAL_BG: Element) {
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
        this.addComponent();
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

    this.valueLabel.textContent = this.state.valueTitle;
    this.titleInput.value = this.state.titleInput;
    this.valueInput.value = this.state.valueInput;
  }

  private addComponent() {
    console.log("add Component");
  }

  showModal(valueTitle: MODAL_VALUE) {
    this.resetModal();
    this.setState({ switch: "SHOW", valueTitle });

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
  // const MODAL_BTN_ADD: Element | null = document.querySelector(".btn--add");
  // const MODAL_BTN_CLOSE: Element | null = document.querySelector(".btn--close");

  let modal = new Modal(MODAL_BG as Element);

  HEADER_BTN_WRAPPER?.addEventListener("click", (e: Event) => {
    let element = e.target as Element;
    if (element.classList.contains("btn--add")) {
      console.log(element.textContent);
      switch (element.textContent) {
        case "IMAGE":
        case "VIDEO":
          modal.showModal("URL");
          break;
        case "NOTE":
        case "TASK":
          modal.showModal("Body");
          break;
        default:
          throw new Error("unexpected click event");
      }
    }
  });
});
