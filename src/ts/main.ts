type MediaElement = "IMAGE" | "VIDEO";
type TextElement = "NOTE" | "TASK";
type ElementType = MediaElement | TextElement;
type Modal = {
  title: string;
  content: "URL" | "Body";
  value: string;
};

let headerBtnWrapper = document.querySelector(".header--btns");
let clickedBtnType: ElementType | null;

const modal: Modal = { title: "", content: "URL", value: "" };

headerBtnWrapper?.addEventListener("click", (e: Event) => {
  let element = e.target as Element;
  clickedBtnType = element.textContent as ElementType;

  addElement(clickedBtnType, modal);
});

function addElement(clickedBtnType: ElementType, modal: Modal): void {
  console.log(modal);
  switch (clickedBtnType) {
    case "IMAGE":
      setModal(modal, { content: "URL" });
      break;
    case "VIDEO":
      setModal(modal, { content: "URL" });
      break;
    case "NOTE":
      setModal(modal, { content: "Body" });
      break;
    case "TASK":
      setModal(modal, { content: "Body" });
      break;
    default:
      new Error("Multiple Elements were selected");
  }
}

function setModal<M>(modal: M, fieldsToUpdate: Partial<M>): M {
  return { ...modal, ...fieldsToUpdate };
}
