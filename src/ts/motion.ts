type MODAL_VALUE = "URL" | "Body";
type MODAL_STATE = {
  componentType: COMPONENT_TYPE;
  titleInput: string;
  valueTitle: MODAL_VALUE;
  valueInput: string;
};
type COMPONENT_TYPE = "IMAGE" | "VIDEO" | "NOTE" | "TASK";

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
    let newComponent = document.createElement("div");
    newComponent.classList.add("component");
    this.setState(input);
    this.section.appendChild(this.parseValue(input, newComponent));
    newComponent.querySelector(".btn--close")?.addEventListener("click", () => {
      if (confirm("해당 요소를 삭제하시겠습니까?")) {
        this.section.removeChild(newComponent);
      }
    });
  }
  parseValue(
    param: Pick<MODAL_STATE, "titleInput" | "valueInput">,
    componentWrapper: Element
  ): Element {
    let html = "";
    let title = param.titleInput;
    let value = param.valueInput;
    switch (this.state.componentType) {
      case "IMAGE":
        componentWrapper.classList.add("component--media");
        html = `<div class="media">
          <img src="${value}" alt="img" />
        </div>
        <div class="paragraph">
          <div class="text--wrapper">
            <p class="text--title title">${title}</p>
          </div>
          <div class="btn--close">
            <i class="fas fa-times"></i>
          </div>
        </div>`;
        break;
      case "VIDEO":
        componentWrapper.classList.add("component--media");
        let videoId = "";
        let regex1 = /(?:https?\/\/)?(?:www\.)?youtu.be\/([a-zA-z0-9-]{11})/;
        let regex2 = /(?:https?\/\/)?(?:www\.)?youtube.com\/watch\?v=([a-zA-z0-9-]{11})/;

        if (value.match(regex1)) {
          let result: RegExpMatchArray = value.match(
            regex1
          ) as RegExpMatchArray;
          videoId = result[1];
        } else if (value.match(regex2)) {
          let result: RegExpMatchArray = value.match(
            regex2
          ) as RegExpMatchArray;
          videoId = result[1];
        } else {
          throw new Error("not a youtube url");
        }

        console.log(videoId);
        html = `<div class="media">
        <iframe id="ytplayer" type="text/html"
        src="https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com"
        frameborder="0"></iframe>
        </div>
        <div class="paragraph">
          <div class="text--wrapper">
            <p class="text--title title">${title}</p>
          </div>
          <div class="btn--close">
            <i class="fas fa-times"></i>
          </div>
        </div>`;
        break;
      case "NOTE":
        componentWrapper.classList.add("component--text");
        html = `<div class="paragraph">
          <div class="text--wrapper">
            <p class="text--title title">${title}</p>
            <p class="text--list">${value}</p>
          </div>
          <div class="btn--close">
            <i class="fas fa-times"></i>
          </div>
        </div>`;
        break;
      case "TASK":
        componentWrapper.classList.add("component--text");
        html = `<div class="paragraph">
          <div class="text--wrapper">
            <p class="text--title title">${title}</p>
            <input type="checkbox" name="checkbox" />
            <label class="text--list" for="checkbox">${value}</label>
          </div>
          <div class="btn--close">
            <i class="fas fa-times"></i>
          </div>
        </div>`;
        break;
      default:
        throw new Error("unable to parse Value");
    }
    componentWrapper.innerHTML = html;
    return componentWrapper;
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
