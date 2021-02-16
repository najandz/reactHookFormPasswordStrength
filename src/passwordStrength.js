export const StrengthLevels = {
  WEAK: "weak",
  AVERAGE: "average",
  STRONG: "strong"
};

/**
 * This is just for demonstration purposes,
 * not a safe password strenght test.
 */
const lowerCaseRegex = /[a-z]/g;
const upperCaseRegex = /[A-Z]/g;
const numbersRegex = /[0-9]/g;
const specialCharacterRegex = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

const minLength = 8;
let analysis = "";

const countChars = (str) => {
  const result = {};
  Array.from(str).forEach((char) => {
    const curVal = result[char];
    if (curVal) {
      result[char] += 1;
    } else {
      result[char] = 1;
    }
  });
  return result;
};
const analyzePassword = (password) => {
  const charMap = countChars(password);
  analysis = {
    length: password.length,
    uppercaseCount: 0,
    lowercaseCount: 0,
    numberCount: 0,
    symbolCount: 0
  };

  Object.keys(charMap).forEach((char) => {
    if (upperCaseRegex.test(char)) {
      analysis.uppercaseCount += charMap[char];
    } else if (lowerCaseRegex.test(char)) {
      analysis.lowercaseCount += charMap[char];
    } else if (numbersRegex.test(char)) {
      analysis.numberCount += charMap[char];
    } else if (specialCharacterRegex.test(char)) {
      analysis.symbolCount += charMap[char];
    }
  });
  return analysis;
};

export const isStrongPassword = (str) => {
  analysis = analyzePassword(str);

  return (
    analysis.length >= minLength &&
    analysis.lowercaseCount >= 1 &&
    analysis.uppercaseCount >= 1 &&
    analysis.numberCount >= 1 &&
    analysis.symbolCount >= 1
  );
};

export function ValidatePassword(password) {
  /*Array of rules and the information target*/
  var rules = [
    {
      Pattern: "[A-Z]",
      Target: "UpperCase"
    },
    {
      Pattern: "[a-z]",
      Target: "LowerCase"
    },
    {
      Pattern: "[0-9]",
      Target: "Numbers"
    },
    {
      Pattern: "[!@@#$%^&*]",
      Target: "Symbols"
    }
  ];

  /*Length Check, add and remove class could be chained*/
  /*I've left them seperate here so you can see what is going on */
  /*Note the Ternary operators ? : to select the classes*/

  const length = document.getElementById("Length");
  const passwordContainer = document.getElementById("passwordStrength");

  length?.classList.remove(
    password.length > 6 ? "glyphicon-remove" : "glyphicon-ok"
  );
  length?.classList.add(
    password.length > 6 ? "glyphicon-ok" : "glyphicon-remove"
  );

  /*Iterate our remaining rules. The logic is the same as for Length*/
  for (var i = 0; i < rules.length; i++) {
    passwordContainer
      ?.querySelector("#" + rules[i].Target)
      .classList?.remove(
        new RegExp(rules[i].Pattern).test(password)
          ? "glyphicon-remove"
          : "glyphicon-ok"
      );

    passwordContainer
      ?.querySelector("#" + rules[i].Target)
      .classList?.add(
        new RegExp(rules[i].Pattern).test(password)
          ? "glyphicon-ok"
          : "glyphicon-remove"
      );
  }
}
