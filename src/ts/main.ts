type MediaElement = "IMAGE" | "VIDEO";
type TextElement = "NOTE" | "TASK";
type ElementType = MediaElement | TextElement;
type Modal = {
  title: string;
  content: "URL" | "Body";
  value: string;
};

window.addEventListener("DOMContentLoaded", () => {
  let headerBtnWrapper = document.querySelector(".header--btns");
  let clickedBtnType: ElementType | null;

  const modal: Modal = { title: "", content: "URL", value: "" };

  headerBtnWrapper?.addEventListener("click", (e: Event) => {
    let element = e.target as Element;
    clickedBtnType = element.textContent as ElementType;

    btnClicked(clickedBtnType, modal);
  });
});

function btnClicked(clickedBtnType: ElementType, modal: Modal): void {
  console.log(clickedBtnType);
  let newModal: Modal;
  switch (clickedBtnType) {
    case "IMAGE":
      newModal = setModal(modal, { content: "URL" });
    case "VIDEO":
      newModal = setModal(modal, { content: "URL" });
    case "NOTE":
      newModal = setModal(modal, { content: "Body" });
    case "TASK":
      newModal = setModal(modal, { content: "Body" });
    default:
      new Error("Multiple Elements were selected");
  }
}

function setModal<M>(modal: M, fieldsToUpdate: Partial<M>): M {
  return { ...modal, ...fieldsToUpdate };
}

function showModal<>
