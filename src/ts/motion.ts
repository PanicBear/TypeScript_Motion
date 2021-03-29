type PICK<T, K extends keyof T> = {
  [P in K]: T[P];
};

type MODAL_SWITCH = "HIDE" | "SHOW";
type MODAL_VALUE = "URL" | "Body";
type MEDIA_COMPONENT = PICK<COMPONENT_DATA, "title" | "url">;
type TEXT_COMPONENT = PICK<COMPONENT_DATA, "title" | "body">;

type MODAL_STATE = {
  switch: MODAL_SWITCH;
  titleInput: string;
  valueTitle: MODAL_VALUE;
  valueInput: string;
};

type COMPONENT_DATA = {
  readonly title: string;
  readonly url?: string;
  readonly body?: string;
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

  constructor(private MODAL_WINDOW: Element) {}

  private resetModal() {
    // switch는 show & hide 있고
    // valueTitle은 띄울 때 초기화되기에 상관없음
    let resetParam: Partial<MODAL_STATE> = {
      titleInput: "",
      valueInput: "",
    };
    this.state = { ...this.state, ...resetParam };
  }

  private setModalState(modifyParam: Partial<MODAL_STATE>) {
    this.state = { ...this.state, ...modifyParam };
  }

  showModal(valueTitle: MODAL_VALUE) {
    this.resetModal();
    this.setModalState({ switch: "SHOW", valueTitle });

    let valueLabel: Element | null = this.MODAL_WINDOW.querySelector(
      ".window--value__label"
    );
    let titleInput: HTMLInputElement | null = this.MODAL_WINDOW.querySelector(
      ".window--title__input"
    );
    let valueInput: HTMLInputElement | null = this.MODAL_WINDOW.querySelector(
      ".window--value__textarea"
    );

    this.MODAL_WINDOW.classList.remove("modal-hide");
    this.MODAL_WINDOW.classList.add("modal-show");
    (valueLabel as Element).textContent = this.state.valueTitle;
    (titleInput as HTMLInputElement).value = this.state.titleInput;
    (valueInput as HTMLInputElement).value = this.state.valueInput;
  }

  hideModal() {
    this.MODAL_WINDOW.classList.add("modal-hide");
    this.MODAL_WINDOW.classList.remove("modal-show");

    let modalInputTitle: HTMLInputElement | null = this.MODAL_WINDOW.querySelector(
      ".window--title__input"
    );
    let modalInputValue: HTMLInputElement | null = this.MODAL_WINDOW.querySelector(
      ".window--value__input"
    );

    (modalInputTitle as HTMLInputElement).value = "";
    (modalInputValue as HTMLInputElement).value = "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const HEADER_BTN_WRAPPER = document.querySelector(".header--btns");
  const MODAL_WINDOW: Element | null = document.querySelector(".modal--bg");
  const MODAL_CLOSE_BTN: Element | null = document.querySelector(".btn--close");
  HEADER_BTN_WRAPPER?.addEventListener("click", (e: Event) => {
    let element = e.target as Element;
    let component;

    let modal = new Modal(MODAL_WINDOW as Element);

    if (element.classList.contains("btn--add")) {
      console.log(element.textContent);
      switch (element.textContent) {
        case "IMAGE":
        case "VIDEO":
          console.log(
            modal.showModal(
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
