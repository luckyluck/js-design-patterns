window.onload = function () {
    let model = {
        students: [
            {
                name: 'Slappy the Frog',
                attendance: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                name: 'Lilly the Lizard',
                attendance: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                name: 'Paulrus the Walrus',
                attendance: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                name: 'Gregory the Goat',
                attendance: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                name: 'Adam the Anaconda',
                attendance: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
        ]
    };

    let octopus = {
        init: function () {
            view.init();
        },
        getStudents: function () {
            return model.students;
        },
        updateAttendance: function (studentIndex, attendanceIndex, value) {
            model.students[studentIndex].attendance[attendanceIndex] = value ? 1 : 0;

            view.updateMissedColumns();
        }
    };

    let view = {
        init: function () {
            this.studentsList = document.getElementById('studentsList');

            this.render();
        },
        updateMissedColumns: function () {
            let students = octopus.getStudents();
            let missedTds = document.querySelectorAll('.missed-col');
            for (let i = 1; i < missedTds.length; i++) {
                missedTds[i].textContent = '' + students[i - 1].attendance.reduce((sum, current) => sum + current, 0);
            }
        },
        render: function () {
            let students = octopus.getStudents();
            let fragment = document.createDocumentFragment();
            this.studentsList.innerHTML = '';

            for (let i = 0; i < students.length; i++) {
                let tr = document.createElement('tr');
                tr.setAttribute('class', 'student');

                let td = document.createElement('td');
                td.setAttribute('class', 'name-col');
                td.textContent = students[i].name;
                tr.appendChild(td);

                let checked = 0;

                for (let j = 0; j < students[i].attendance.length; j++) {
                    checked += students[i].attendance[j];

                    let td = document.createElement('td');
                    td.setAttribute('class', 'attend-col');

                    let input = document.createElement('input');
                    input.setAttribute('type', 'checkbox');
                    input.addEventListener('click', event => {
                        octopus.updateAttendance(i, j, event.target.checked);
                    });

                    td.appendChild(input);
                    tr.appendChild(td);
                }

                td = document.createElement('td');
                td.setAttribute('class', 'missed-col');
                td.textContent = checked;
                tr.appendChild(td);

                fragment.appendChild(tr);
            }

            this.studentsList.appendChild(fragment);
        }
    };

    octopus.init();
};
