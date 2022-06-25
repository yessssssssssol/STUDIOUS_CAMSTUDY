export default function RankingTable({ rankings }) {
  const oddRank = 'text-center bg-blue-200 p-2';
  const evenRank = 'text-center p-2';
  return (
    <>
      <table class="border-collapse table-auto ">
        <thead>
          <tr>
            <th>Ranking</th>
            <th>ID</th>
            <th>TotalTime</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((ranking, index) => {
            if (index % 2 === 0) {
              return (
                <tr key={index}>
                  <td class={oddRank}>{index + 1}</td>
                  <td class={oddRank}>{ranking.user_id}</td>
                  <td class={oddRank}>{ranking.totalTime}</td>
                </tr>
              );
            } else {
              return (
                <tr key={index}>
                  <td class={evenRank}>{index + 1}</td>
                  <td class={evenRank}>{ranking.user_id}</td>
                  <td class={evenRank}>{ranking.totalTime}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </>
  );
}
