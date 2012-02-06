function Quiz() {}

Quiz.prototype.initialize = function(inputEl, solutionEl, hintEl) {
  var self = this;

  this.inputEl = inputEl;
  this.solutionEl = solutionEl;
  this.hintEl = hintEl;

  this.inputEl.keydown(function(e) {
    if (e.keyCode == 13) {
      self.checkMatch();
    }
  });
}

Quiz.prototype.start = function(words) {
  this.words = words;
  this.nextWord();
}

Quiz.prototype.checkMatch = function() {
  if (this.solutionEl.html() == this.inputEl.val()) {
    this.nextWord();
  }
}

Quiz.prototype.nextWord = function() {
  var word = this.words.shift();
  this.inputEl.val("");
  this.hintEl.html(word.hint);
  this.solutionEl.html(word.solution);

  this.inputEl.blur();
  this.inputEl.focus();
}
