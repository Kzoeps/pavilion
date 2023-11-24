export enum ClassYear {
  senior = "Senior",
  junior = "Junior",
  sophomore = "Sophomore",
  firstYear = "First Year",
}

export const calculateOptimum = (
  classYear: string
): { optimum: number; low: number; high: number } => {
  const yearDiff = parseInt(classYear) - new Date().getFullYear();
  if (yearDiff === 0 || (yearDiff === 1 && new Date().getMonth() > 5)) {
    if (yearDiff === 0) {
      return { optimum: 9, low: 7, high: 10 };
    } else {
      return { optimum: 8, low: 7, high: 10 };
    }
  } else if (yearDiff === 1 || (yearDiff === 2 && new Date().getMonth() > 5)) {
    if (yearDiff === 1) {
      return { optimum: 7, low: 5, high: 10 };
    } else {
      return { optimum: 5, low: 3, high: 10 };
    }
  } else if (yearDiff === 2 || (yearDiff === 3 && new Date().getMonth() > 5)) {
    if (yearDiff === 2) {
      return { optimum: 3, low: 1, high: 10 };
    } else {
      return { optimum: 2, low: 0, high: 10 };
    }
  } else {
    return { optimum: 0, low: 0, high: 10 };
  }
};

/**
 * if the current month is after July, then it means fall semester of the current year has started so the class for that year has graduated and should'nt be included.
 * if the current month is before July then it means it is the spring semester so the class for that year are due to graduate in the same year
 * @returns an array of strings representing the current class years
 */
export const getCurrentClassYears = (): string[] => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  if (currentMonth > 6) {
    return [
      `${currentYear + 1}`,
      `${currentYear + 2}`,
      `${currentYear + 3}`,
      `${currentYear + 4}`,
    ];
  } else {
    return [
      `${currentYear}`,
      `${currentYear + 1}`,
      `${currentYear + 2}`,
      `${currentYear + 3}`,
    ];
  }
};
