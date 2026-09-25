// ==========================================
// BASIC ELEMENTS
// ==========================================

const assessments = document.getElementById("assessments");
const addButton = document.getElementById("addAssessment");

const result = document.getElementById("result");
const gradeLetter = document.getElementById("gradeLetter");


// ==========================================
// ADD ASSESSMENT
// ==========================================

function addAssessment() {

    const row = document.createElement("div");

    row.innerHTML = `
        <input
            class="name"
            placeholder="Assessment name"
        >

        <input
            class="mark"
            type="number"
            placeholder="Mark %"
            min="0"
            max="100"
        >

        <input
            class="weight"
            type="number"
            placeholder="Weight %"
            min="0"
            max="100"
        >

        <button class="removeAssessment">
            Remove
        </button>
    `;

    const removeButton =
        row.querySelector(".removeAssessment");

    removeButton.addEventListener("click", function () {
        row.remove();
    });

    assessments.appendChild(row);
}

addButton.addEventListener("click", addAssessment);


// ==========================================
// LETTER GRADE
// ==========================================

function getGrade(percentage) {

    if (percentage >= 80) {
        return "A";
    }

    if (percentage >= 70) {
        return "B";
    }

    if (percentage >= 60) {
        return "C";
    }

    if (percentage >= 50) {
        return "D";
    }

    return "E";
}


// ==========================================
// CURRENT GRADE
// ==========================================

const calculateButton =
    document.getElementById("calculate");

calculateButton.addEventListener(
    "click",
    calculateGrade
);

function calculateGrade() {

    const marks =
        document.querySelectorAll(".mark");

    const weights =
        document.querySelectorAll(".weight");

    let weightedTotal = 0;
    let completedWeight = 0;

    for (let i = 0; i < marks.length; i++) {

        const markValue = marks[i].value;
        const weightValue = weights[i].value;

        if (
            markValue !== "" &&
            weightValue !== ""
        ) {

            const mark = Number(markValue);
            const weight = Number(weightValue);

            weightedTotal +=
                mark * (weight / 100);

            completedWeight +=
                weight / 100;
        }
    }

    if (completedWeight === 0) {

        result.textContent = "—";
        gradeLetter.textContent = "—";

        return;
    }

    const currentGrade =
        weightedTotal / completedWeight;

    result.textContent =
        currentGrade.toFixed(2) + "%";

    gradeLetter.textContent =
        getGrade(currentGrade);
}


// ==========================================
// TARGET GRADE CALCULATOR
// ==========================================

const targetGrade =
    document.getElementById("targetGrade");

const calculateTargetButton =
    document.getElementById("calculateTarget");

const targetResult =
    document.getElementById("targetResult");

calculateTargetButton.addEventListener(
    "click",
    calculateTarget
);

function calculateTarget() {

    const marks =
        document.querySelectorAll(".mark");

    const weights =
        document.querySelectorAll(".weight");

    let weightedTotal = 0;
    let completedWeight = 0;

    for (let i = 0; i < marks.length; i++) {

        const markValue = marks[i].value;
        const weightValue = weights[i].value;

        if (
            markValue !== "" &&
            weightValue !== ""
        ) {

            const mark = Number(markValue);
            const weight = Number(weightValue);

            weightedTotal +=
                mark * weight;

            completedWeight += weight;
        }
    }

    const target =
        Number(targetGrade.value);

    if (
        isNaN(target) ||
        target < 0 ||
        target > 100
    ) {

        targetResult.textContent =
            "Enter a target between 0 and 100";

        return;
    }

    const remainingWeight =
        100 - completedWeight;

    if (remainingWeight <= 0) {

        const finalGrade =
            weightedTotal / 100;

        if (finalGrade >= target) {

            targetResult.textContent =
                "Target achieved!";

        } else {

            targetResult.textContent =
                "Target not achieved";
        }

        return;
    }

    const requiredMark =
        (
            target * 100 -
            weightedTotal
        ) / remainingWeight;

    if (requiredMark > 100) {

        targetResult.textContent =
            "Not possible";

    } else if (requiredMark <= 0) {

        targetResult.textContent =
            "Target already achieved";

    } else {

        targetResult.textContent =
            requiredMark.toFixed(1) +
            "% average needed";
    }
}


// ==========================================
// FINAL ASSESSMENT CALCULATOR
// ==========================================

const calculateFinalButton =
    document.getElementById("calculateFinal");

const finalTarget =
    document.getElementById("finalTarget");

const finalWeight =
    document.getElementById("finalWeight");

const finalResult =
    document.getElementById("finalResult");

const finalGradeLetter =
    document.getElementById("finalGradeLetter");

calculateFinalButton.addEventListener(
    "click",
    calculateFinalGrade
);

function calculateFinalGrade() {

    const marks =
        document.querySelectorAll(".mark");

    const weights =
        document.querySelectorAll(".weight");

    let completedTotal = 0;
    let completedWeight = 0;

    for (let i = 0; i < marks.length; i++) {

        const markValue = marks[i].value;
        const weightValue = weights[i].value;

        if (
            markValue !== "" &&
            weightValue !== ""
        ) {

            const mark = Number(markValue);
            const weight = Number(weightValue);

            completedTotal +=
                mark * (weight / 100);

            completedWeight +=
                weight / 100;
        }
    }

    const target =
        Number(finalTarget.value);

    const weight =
        Number(finalWeight.value);


    // Check target

    if (
        isNaN(target) ||
        target < 0 ||
        target > 100
    ) {

        finalResult.textContent =
            "Enter a target between 0 and 100";

        finalGradeLetter.textContent = "—";

        return;
    }


    // Check final assessment weight

    if (
        isNaN(weight) ||
        weight <= 0 ||
        weight > 100
    ) {

        finalResult.textContent =
            "Enter a valid assessment weight";

        finalGradeLetter.textContent = "—";

        return;
    }


    // Work out required mark

    const requiredMark =
        (
            target - completedTotal
        ) / (weight / 100);


    // Display target grade

    finalGradeLetter.textContent =
        getGrade(target);


    // Work out result

    if (requiredMark > 100) {

        finalResult.textContent =
            "Not possible";

    } else if (requiredMark <= 0) {

        finalResult.textContent =
            "0% — target already achieved";

    } else {

        finalResult.textContent =
            requiredMark.toFixed(1) + "%";
    }
}