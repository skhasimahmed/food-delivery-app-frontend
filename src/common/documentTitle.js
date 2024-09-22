import { useEffect } from "react";

const DocumentTitle = (title) => {
  useEffect(() => {
    document.title = "FoodZie. - " + title;
  }, [title]);
};

export default DocumentTitle;
