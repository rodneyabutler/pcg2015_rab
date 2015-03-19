  function Cart(table) {

        function updateSubtotal(line) {
            var quantity = parseFloat(line.getElementsByClassName("quantity")[0].value);
            var price = parseFloat(line.getElementsByClassName("price-each")[0].innerHTML);
            var subtotal = quantity * price;
            var subtotalElement = line.getElementsByClassName("subtotal")[0];
            subtotalElement.innerHTML = subtotal;
            return subtotal;
        }

        function updateTotals() {
            var lines = table.getElementsByClassName("cart-line");
            var line_count = lines.length;
            var total = 0;

            for (var i = 0; i < line_count; i++) {
                var line = lines[i];
                total += updateSubtotal(line);
            }
            var totalElement = document.getElementById("cart-total");
            totalElement.innerHTML = String(total);
        }

        function Row() {
            var row = document.getElementById('cart-template').cloneNode(true);
            row.classList.remove("template");
            addActionListeners(row);
            return row;
        }

        function addLine() {
            var existingRow = table.getElementsByClassName("cart-total")[0];
            var row = Row();
            row.getElementsByClassName("product-code")[0].selectedIndex = 2;
            insertAbove(row, existingRow);
        }

        function insertRow(event) {
            var existingRow = event.target.parentElement.parentElement;
            insertAbove(Row(), existingRow);
        }

        function insertAbove(row, existingRow) {
            existingRow.parentElement.insertBefore(row, existingRow);
            updateTotals();
        }

        function removeRow(event) {
            event.target.parentElement.parentElement.remove();
            updateTotals();
        }

        function addActionListeners(line) {
            line.getElementsByTagName("input")[0].addEventListener("change", updateTotals);
            line.getElementsByClassName("removeRow")[0].addEventListener("click", removeRow);
            line.getElementsByClassName("insertRow")[0].addEventListener("click", insertRow);
        }

        document.getElementById("add-line").addEventListener("click", addLine);

        return {
            updateTotals: updateTotals,
            addLine: addLine
        }
    }

    //DOCUMENT READY - PAGE EXISTS
    document.addEventListener("DOMContentLoaded", function () {
        var cart = Cart(document.getElementById("cart-1"));
        cart.addLine();
        cart.addLine();
        cart.updateTotals();
    })
