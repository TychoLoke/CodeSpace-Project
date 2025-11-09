export const POINTS_TABLE = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

export function buildSeasonIndexes(data) {
  const driversById = new Map();
  const teamsById = new Map();
  const teamIdByName = new Map();
  const driverTeamId = new Map();

  data.constructors.forEach((team) => {
    teamsById.set(team.id, team);
    teamIdByName.set(team.name, team.id);
  });

  data.drivers.forEach((driver) => {
    driversById.set(driver.id, driver);
    const teamId = teamIdByName.get(driver.team) ?? null;
    driverTeamId.set(driver.id, teamId);
  });

  return { driversById, teamsById, teamIdByName, driverTeamId };
}

export function computeChampionshipStandings(data, indexes) {
  const driverStats = new Map();
  const constructorStats = new Map();

  data.drivers.forEach((driver) => {
    const teamId = indexes.driverTeamId.get(driver.id) ?? null;
    driverStats.set(driver.id, {
      id: driver.id,
      name: driver.name,
      code: driver.code,
      team: driver.team,
      teamId,
      points: 0,
      wins: 0,
      podiums: 0
    });
  });

  data.constructors.forEach((team) => {
    constructorStats.set(team.id, {
      id: team.id,
      name: team.name,
      points: 0,
      wins: 0,
      podiums: 0
    });
  });

  data.races.forEach((race) => {
    race.results.forEach((result) => {
      const driver = driverStats.get(result.driverId);
      if (!driver) return;

      driver.points += result.points;
      if (result.position === 1) {
        driver.wins += 1;
      }
      if (result.position <= 3) {
        driver.podiums += 1;
      }

      const teamId = driver.teamId;
      if (teamId && constructorStats.has(teamId)) {
        const team = constructorStats.get(teamId);
        team.points += result.points;
        if (result.position === 1) {
          team.wins += 1;
        }
        if (result.position <= 3) {
          team.podiums += 1;
        }
      }
    });

    if (race.fastestLap?.driverId) {
      const driver = driverStats.get(race.fastestLap.driverId);
      if (driver) {
        driver.points += race.fastestLap.points;
        const teamId = driver.teamId;
        if (teamId && constructorStats.has(teamId)) {
          constructorStats.get(teamId).points += race.fastestLap.points;
        }
      }
    }
  });

  const driverStandings = Array.from(driverStats.values()).sort(sortStandings);
  const constructorStandings = Array.from(constructorStats.values()).sort(sortStandings);

  return { driverStandings, constructorStandings };
}

export function projectSimulation(baseDriverStandings, baseConstructorStandings, order, fastestLapDriver) {
  const driverBaseline = new Map(baseDriverStandings.map((driver) => [driver.id, driver.points]));
  const constructorBaseline = new Map(baseConstructorStandings.map((team) => [team.id, team.points]));

  const projectedDrivers = baseDriverStandings.map((driver) => ({ ...driver }));
  const projectedConstructors = baseConstructorStandings.map((team) => ({ ...team }));
  const driverLookup = new Map(projectedDrivers.map((driver) => [driver.id, driver]));
  const constructorLookup = new Map(projectedConstructors.map((team) => [team.id, team]));

  order.forEach((driverId, index) => {
    const points = POINTS_TABLE[index] ?? 0;
    const driver = driverLookup.get(driverId);
    if (!driver) return;
    driver.points += points;

    const teamId = driver.teamId;
    if (teamId && constructorLookup.has(teamId)) {
      constructorLookup.get(teamId).points += points;
    }
  });

  if (fastestLapDriver) {
    const driver = driverLookup.get(fastestLapDriver);
    if (driver) {
      driver.points += 1;
      const teamId = driver.teamId;
      if (teamId && constructorLookup.has(teamId)) {
        constructorLookup.get(teamId).points += 1;
      }
    }
  }

  const driverStandings = Array.from(driverLookup.values()).sort(sortStandings);
  const constructorStandings = Array.from(constructorLookup.values()).sort(sortStandings);

  const topTwo = driverStandings.slice(0, 2);
  let summary = null;
  if (topTwo.length === 2) {
    const gap = topTwo[0].points - topTwo[1].points;
    summary = {
      leader: topTwo[0].name,
      chaser: topTwo[1].name,
      gap
    };
  }

  return {
    driverStandings,
    constructorStandings,
    driverBaseline,
    constructorBaseline,
    summary
  };
}

export function sortStandings(a, b) {
  if (b.points !== a.points) return b.points - a.points;
  if ((b.wins ?? 0) !== (a.wins ?? 0)) return (b.wins ?? 0) - (a.wins ?? 0);
  if ((b.podiums ?? 0) !== (a.podiums ?? 0)) return (b.podiums ?? 0) - (a.podiums ?? 0);
  return a.name.localeCompare(b.name);
}

export function formatPoints(value) {
  return Number(value ?? 0).toFixed(0);
}

export function formatDate(date) {
  if (!date) return "TBC";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }
  return parsed.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
