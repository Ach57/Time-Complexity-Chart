const results1 = [];
const results2 = [];

function measureExecutionTime1(n) {
    const start = performance.now();
    let sum = 0;

    for (let k = 0; k < n; k++) {  // O(n) time complexity
        sum += k;
    }

    const end = performance.now();
    const timeTaken = (end - start).toFixed(3);
    results1.push({ n: n, T: parseFloat(timeTaken) });
}

function measureExecutionTime2(n) {
    const start = performance.now();
    let sum = 0;

    for (let k = n; k >= 1;) {
        for (let i = 1; i <= 1000;) {
            for (let j = 1; j <= n;) {
                sum += i + j + k;
                i = i * 2;
                j = j + 2;
                k = k / 4;
            }
        }
    } 

    const end = performance.now();
    const timeTaken = (end - start).toFixed(3);
    results2.push({ n: n, T: parseFloat(timeTaken) });
}


for (let n = 100; n <= 2000000; n += 10000) {
    measureExecutionTime1(n);
    measureExecutionTime2(n);
}


const labels = results1.map(result => result.n);
const data1 = results1.map(result => result.T);
const data2 = results2.map(result => result.T);

// First Chart
const ctx1 = document.getElementById('executionTimeChart1').getContext('2d');
new Chart(ctx1, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Execution Time T(n) for O(n)',
            data: data1,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            fill: true,
        }]
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Input Size (n)'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Execution Time T(n) (ms)'
                },
                beginAtZero: true
            }
        }
    }
});

// Second Chart
const ctx2 = document.getElementById('executionTimeChart2').getContext('2d');
new Chart(ctx2, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Execution Time T(n) for Nested Loop',
            data: data2,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 2,
            fill: true,
        }]
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Input Size (n)'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Execution Time T(n) (ms)'
                },
                beginAtZero: true
            }
        }
    }
});
