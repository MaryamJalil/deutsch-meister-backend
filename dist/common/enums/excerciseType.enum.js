"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcerciseType = void 0;
const dist_1 = require("@nestjs/graphql/dist");
var ExcerciseType;
(function (ExcerciseType) {
    ExcerciseType["MULTIPLE_CHOICE"] = "MULTIPLE_CHOICE";
    ExcerciseType["FILL_IN_THE_BLANK"] = "FILL_IN_THE_BLANK";
    ExcerciseType["SENTENCE_ORDERING"] = "SENTENCE_ORDERING";
    ExcerciseType["LISTENING_COMPREHENSION"] = "LISTENING_COMPREHENSION";
})(ExcerciseType || (exports.ExcerciseType = ExcerciseType = {}));
(0, dist_1.registerEnumType)(ExcerciseType, {
    name: 'ExcerciseType',
    description: 'Type of exercise presented to the learner',
});
