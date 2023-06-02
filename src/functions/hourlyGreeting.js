export const hourlyGreeting = () => {
  let now = new Date();

  switch (true) {
    case now.getHours() >= 5 && now.getHours() < 12:
      return "Buenos días";
    case now.getHours() >= 12 && now.getHours() <= 18:
      return "Buenas tardes";
    case now.getHours() > 18 || now.getHours() < 5:
      return "Buenas noches";
    default:
      return "";
  }
};
