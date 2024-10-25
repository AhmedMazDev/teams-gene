"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function TeamGenerator() {
  const [numTeams, setNumTeams] = useState("");
  const [playerNames, setPlayerNames] = useState("");
  const [teams, setTeams] = useState<string[][]>([]);
  const [error, setError] = useState<string | null>(null);

  const generateTeams = () => {
    const teamCount = parseInt(numTeams);
    const players = playerNames
      .split("\n")
      .filter((name) => name.trim() !== "");

    if (isNaN(teamCount) || teamCount <= 0) {
      setError("Please enter a valid number of teams.");
      return;
    }

    if (players.length === 0) {
      setError("Please enter at least one player name.");
      return;
    }

    if (players.length < teamCount) {
      setError(
        "The number of players must be greater than or equal to the number of teams."
      );
      return;
    }

    setError(null);

    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
    const newTeams: string[][] = Array.from({ length: teamCount }, () => []);

    shuffledPlayers.forEach((player, index) => {
      newTeams[index % teamCount].push(player);
    });

    setTeams(newTeams);
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Team Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="playerNames">Player Names (one per line)</Label>
              <Textarea
                id="playerNames"
                value={playerNames}
                onChange={(e) => setPlayerNames(e.target.value)}
                placeholder="John Doe&#10;Jane Smith&#10;..."
                rows={5}
              />
            </div>
            <div>
              <Label htmlFor="numTeams">Number of Teams</Label>
              <Input
                id="numTeams"
                type="number"
                value={numTeams}
                onChange={(e) => setNumTeams(e.target.value)}
                min="1"
              />
            </div>
            <Button onClick={generateTeams}>Generate Teams</Button>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {teams.length > 0 && (
              <div className="grid gap-4 mt-4">
                {teams.map((team, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>Team {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5">
                        {team.map((player, playerIndex) => (
                          <li key={playerIndex}>{player}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
