// src/ui/GameLeaderBoard.ts
import { Player } from "../../types/player.types";
import Card from "../card.ui";



export const CreateGameLeaderBoard = (
    { parent, players }: { parent: HTMLElement | null; players: Player[] },
) => {
    // create leader board for game players
    if (!parent) return;

    const leaderBoard = new Card({
        classNames: "left-5 top-5 absolute",
        children: [],
        id: "leader-board",
    }).render();

    players.forEach((player, index) => {
        const playerDiv = document.createElement("div");
        playerDiv.className = "flex gap-3 items-center w-64";
        playerDiv.id = `player-${index + 1}`;

        // Player Avatar
        const playerAvatar = document.createElement("img");
        playerAvatar.src = player.avatar_url;
        playerAvatar.alt = `player-${index + 1}`;
        playerAvatar.className = 'h-7 w-7 rounded-full bg-white';

        // Player Info (Name and Progress Bar)
        const playerInfo = document.createElement("div");
        playerInfo.className = 'flex flex-col w-full';

        const playerName = document.createElement("small");
        playerName.className = 'text-slate-300';
        playerName.textContent = player.name;

        const progressBarContainer = document.createElement("div");
        progressBarContainer.id = `player-${index + 1}-progress`;
        progressBarContainer.className = 'h-[5px] bg-white overflow-hidden rounded-xl mt-[1px]';

        const progressBar = document.createElement("div");
        progressBar.className = 'h-full bg-red-700';
        progressBar.style.width = `${player.progress}%`;

        progressBarContainer.appendChild(progressBar);

        playerInfo.appendChild(playerName);
        playerInfo.appendChild(progressBarContainer);

        playerDiv.appendChild(playerAvatar);
        playerDiv.appendChild(playerInfo);

        // Append player div to the leaderboard
        leaderBoard.appendChild(playerDiv);
    });

    // Append leaderboard to the parent
    parent.appendChild(leaderBoard);
};
