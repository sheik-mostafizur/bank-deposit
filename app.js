window.onload = function () {
  main();
};

function main() {
  // login
  const loginArea = document.querySelector("#login-area");
  const submit = loginArea.querySelector("input[type='submit']");
  const bankId = loginArea.querySelector(".user-id input");
  const bankPass = loginArea.querySelector(".user-pass input");

  submit.addEventListener("click", handleSubmit(bankId, bankPass));

  bankDeposit();
}

function handleSubmit(bankId, bankPass) {
  return function () {
    const userIdFeedBack = document.querySelector(".user-id .invalid-feedback");
    const userPassFeedBack = document.querySelector(
      ".user-pass .invalid-feedback"
    );

    let userId = bankId.value;
    let userPass = bankPass.value;

    if (userId == "") {
      bankId.classList.add("is-invalid");
      userIdFeedBack.innerText = "Please provide your user id";
      return false;
    } else if (userId.length < 8) {
      bankId.classList.add("is-invalid");
      userIdFeedBack.innerText = "At least provide the user id 8 digits";
      return false;
    } else {
      bankId.classList.remove("is-invalid");
    }

    if (userPass == "") {
      bankPass.classList.add("is-invalid");
      userPassFeedBack.innerText = "Please provide your password";
      return false;
    } else if (userPass.length < 6) {
      bankPass.classList.add("is-invalid");
      userPassFeedBack.innerText = "At least provide the password id 6 digits";
      return false;
    } else {
      bankPass.classList.remove("is-invalid");
    }
    bankId.value = "";
    bankPass.value = "";

    // hide login and show bank deposit
    document.querySelector("#login-area").classList.add("d-none");
    document.getElementById("bank_deposit_area").classList.remove("d-none");
  };
}

function bankDeposit() {
  let deposit = 0;
  let withdraw = 0;
  let balance = 0;

  const bankDepositArea = document.getElementById("bank_deposit_area");
  const mainBalance = document.querySelector("#bank_deposit_area #balance h3");
  mainBalance.innerText = "$" + balance;
  const setDeposit = bankDepositArea.querySelector(".set_deposit input");
  const DepositBtn = bankDepositArea.querySelector(".set_deposit button");

  const setWithdraw = bankDepositArea.querySelector(".set_withdraw input");
  const WithdrawBtn = bankDepositArea.querySelector(".set_withdraw button");

  DepositBtn.addEventListener("click", handleDeposit(setDeposit));
  WithdrawBtn.addEventListener("click", handleWithdraw(setWithdraw));

  function handleDeposit(setAmount) {
    const depositPrint = document.querySelector(
      "#bank_deposit_area #deposit h3"
    );
    depositPrint.innerText = `$${deposit}`;
    return function () {
      let getDeposit = Number(setAmount.value);
      if (getDeposit == 0) return;
      balance = balance + getDeposit;
      mainBalance.innerText = "$" + balance;
      depositPrint.innerText = `$${getDeposit}`;
      checkMainBalance(balance);
      if (balance > 0) {
        WithdrawBtn.removeAttribute("disabled", "disabled");
      }
      setAmount.value = "";
    };
  }
  function handleWithdraw(setAmount) {
    const withdrawPrint = document.querySelector(
      "#bank_deposit_area #withdraw h3"
    );
    withdrawPrint.innerText = `$${withdraw}`;
    return function () {
      let getWithdraw = Number(setAmount.value);
      if (getWithdraw > balance) return alert("Please Check Main Balance");
      withdraw = withdraw + getWithdraw;
      balance = balance - getWithdraw;
      mainBalance.innerText = "$" + balance;
      withdrawPrint.innerText = `$${withdraw}`;
      checkMainBalance(balance);
      if (balance == 0) {
        WithdrawBtn.setAttribute("disabled", "disabled");
      }
      setAmount.value = "";
    };
  }
  function checkMainBalance(balance) {
    let checkBalance = document.querySelector("#bank_deposit_area #balance");
    if (balance > 0) {
      checkBalance.classList.remove("bg-danger", "text-white");
      checkBalance.classList.add("bg-warning");
    } else {
      checkBalance.classList.remove("bg-warning");
      checkBalance.classList.add("bg-danger", "text-white");
    }
  }
}
