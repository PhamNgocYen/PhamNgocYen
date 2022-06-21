/* Set rates + misc */
var taxRate = 0.05;
var shippingRate = 15.00; 
var fadeTime = 300;


/* Assign actions */
$('.tieudegiohang input').change( function() {
  updateQuantity(this);
});

$('.tieudegiohang button').click( function() {
  removeItem(this);
});


/* Recalculate cart */
function recalculateCart()
{
  var subtotal = 0;
  
  /* Sum up row totals */
  $('.tieudegiohang').each(function () {
    subtotal += parseFloat($(this).children('.giasp').text());
  });
  
  /* Calculate totals */
  var tax = subtotal * taxRate;
  var shipping = (subtotal > 0 ? shippingRate : 0);
  var total = subtotal + tax + shipping;
  
  /* Update totals display */
  $('.so').fadeOut(fadeTime, function() {
    $('#cart-sp').html(subtotal.toFixed(2));
    $('#cart-thue').html(tax.toFixed(2));
    $('#cart-ship').html(shipping.toFixed(2));
    $('#cart-tong').html(total.toFixed(2));
    if(total == 0){
      $('.dat').fadeOut(fadeTime);
    }else{
      $('.dat').fadeIn(fadeTime);
    }
    $('.so').fadeIn(fadeTime);
  });
}


/* Update quantity */
function updateQuantity(quantityInput)
{
  /* Calculate line price */
  var productRow = $(quantityInput).parent().parent();
  var price = parseFloat(productRow.children('.giasp').text());
  var quantity = $(quantityInput).val();
  var linePrice = price * quantity;
  
  /* Update line price display and recalc cart totals */
  productRow.children('.giatt').each(function () {
    $(this).fadeOut(fadeTime, function() {
      $(this).text(linePrice.toFixed(2));
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });  
}


/* Remove item from cart */
function removeItem(removeButton)
{
  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(fadeTime, function() {
    productRow.remove();
    recalculateCart();
  });
}