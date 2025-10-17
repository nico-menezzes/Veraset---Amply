var Webflow = Webflow || []
Webflow.push(function () {
	function nestCollections() {
		$('[nest="target"]').each(function() {
			var target = $(this);
			target.empty();
			
			var source = target.closest('.cms-nest').find('[nest="source"]');
			var allItems = source.find('[nest="item"]');
      
			// Randomize items instead of sorting by date
			var shuffledItems = allItems.toArray().sort(function() {
				return Math.random() - 0.5;
			});
      
			target.append($(shuffledItems[0]).clone());
		});
	}
	
	nestCollections();
});
