import lsk_routes from "@/plugins/lsk_routes";

describe("lsk_routes", () => {
    it("should match snapshot", () => {
        expect(Array.isArray(lsk_routes)).toBe(true);
        const snapshot = [];
        lsk_routes.forEach((routeItem) => {
            expect(Object.prototype.toString.call(routeItem)).toBe("[object Object]");
            const item = {};
            Object.keys(routeItem).forEach((key) => {
                if (key === "component") {
                    if (Object.prototype.hasOwnProperty.call(routeItem[key], "name")) {
                        item[key] = { name: routeItem[key]["name"] };
                    }
                } else {
                    item[key] = routeItem[key];
                }
            });
            snapshot.push(item);
        });
        expect(snapshot).toMatchSnapshot();
    });
});
