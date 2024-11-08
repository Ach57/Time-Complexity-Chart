
let results1 = [];
let results2 = [];


function runCode() {
    // Get the user's code from the Monaco editor
    const code = monaco.editor.getModels()[0].getValue();

    
    results1 = [];
    results2 = [];

    function measureExecutionTime(code, n) {
        const start = performance.now(); // Start time measurement

        try {
            eval(code); 
        } catch (e) {
            console.error('Error executing code:', e);
        }

        const end = performance.now(); // End time measurement
        return (end - start).toFixed(3); // Return execution time in milliseconds
    }

    // Loop through different values of n (from 1000 to 10,000,000 with step of 10,000)
    for (let n = 1000; n <= 10000000; n += 10000) {
        const time1 = measureExecutionTime(`
            let sum = 0;
            for (let i = 0; i < ${n}; i++) {
                sum += i; // Simple O(n) operation
            }
        `, n);
        results1.push({ n, T: parseFloat(time1) });
    
        // Simulate a different type of loop (nested loop example) for chart 2
        const time2 = measureExecutionTime(code, n);
        results2.push({ n, T: parseFloat(time2) });
    }

    // After running the loops, update the chart with the new data
    updateChartData();
}


function updateChartData() {
    // Extract n values and execution times (T) from the results
    const labels = results1.map(result => result.n);
    const data1 = results1.map(result => result.T);
    const data2 = results2.map(result => result.T);

    // First Chart for Execution Time (for loop)
    const ctx1 = document.getElementById('executionTimeChart1').getContext('2d');
    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: labels, // Use n values as labels
            datasets: [{
                label: 'Execution Time T(n) of O(n)',
                data: data1, // Time data for the first chart
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
                        text: 'Execution Time (ms)'
                    },
                    beginAtZero: true
                }
            }
        }
    });

    const ctx2 = document.getElementById('executionTimeChart2').getContext('2d');
    new Chart(ctx2, {
        type: 'line',
        data: {
            labels: labels, // Use n values as labels
            datasets: [{
                label: 'Execution Time (Nested Loop)',
                data: data2, // Time data for the second chart
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
                        text: 'Execution Time (ms)'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}
require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor/min/vs' } });
require(['vs/editor/editor.main'], function () {   
    monaco.editor.create(document.getElementById('editor'), {
        value: '// Write your code here',
        language: 'javascript',
        theme: 'vs-dark'
    });
});


document.getElementById("runButton").addEventListener("click", runCode);
