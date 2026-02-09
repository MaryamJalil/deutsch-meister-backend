"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelCode = void 0;
const graphql_1 = require("@nestjs/graphql");
var LevelCode;
(function (LevelCode) {
    LevelCode["A1"] = "A1";
    LevelCode["A2"] = "A2";
    LevelCode["B1"] = "B1";
    LevelCode["B2"] = "B2";
    LevelCode["C1"] = "C1";
    LevelCode["C2"] = "C2";
})(LevelCode || (exports.LevelCode = LevelCode = {}));
(0, graphql_1.registerEnumType)(LevelCode, {
    name: 'LevelCode',
});
