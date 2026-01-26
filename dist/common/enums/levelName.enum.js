"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelName = void 0;
const graphql_1 = require("@nestjs/graphql");
var LevelName;
(function (LevelName) {
    LevelName["A1"] = "A1";
    LevelName["A2"] = "A2";
    LevelName["B1"] = "B1";
    LevelName["B2"] = "B2";
    LevelName["C1"] = "C1";
    LevelName["C2"] = "C2";
})(LevelName || (exports.LevelName = LevelName = {}));
(0, graphql_1.registerEnumType)(LevelName, {
    name: 'LevelName',
    description: 'German language proficiency levels',
});
