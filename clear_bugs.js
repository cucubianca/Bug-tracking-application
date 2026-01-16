import sequelize from "../src/config/database.js";
import Bug from "../src/models/bug.js";

const clearBugs = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to DB.");

        const countBefore = await Bug.count();
        console.log(`Current bug count: ${countBefore}`);

        if (countBefore === 0) {
            console.log("Bug table is already empty.");
            return;
        }

        // Use a direct DELETE if TRUNCATE is failing or being weird
        await Bug.destroy({
            where: {},
            force: true
        });

        const countAfter = await Bug.count();
        console.log(`Bug count after deletion: ${countAfter}`);

        if (countAfter === 0) {
            console.log("Verification Success: All bugs deleted.");
        } else {
            console.log("Verification WARNING: Some bugs still remain.");
        }

    } catch (error) {
        console.error("Error clearing bugs:", error);
    } finally {
        await sequelize.close();
    }
};

clearBugs();
