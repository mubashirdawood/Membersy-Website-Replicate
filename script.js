const myNum = document.querySelectorAll(".count");
const runAnimation = (myCount) => {
  const target_count = +myCount.dataset.count;
  let initial = 0;
  const speed = Math.ceil(target_count / 100);

  const updateNumber = () => {
    if (initial < target_count) {
      initial += speed;
      if (initial > target_count) initial = target_count;
      myCount.innerText = initial;
      setTimeout(updateNumber, 10);
    }
  };
  updateNumber();
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        runAnimation(entry.target);
      } else {
        entry.target.innerText = "0";
      }
    });
  },
  { threshold: 0.5 },
);

myNum.forEach((el) => observer.observe(el));
//----------------------------------------------------------------------------------------------------------------------------------

const alertForm = () => {
  console.log("Submit Button Clicked");
  alert("Your message has been sent successfully!");
};
