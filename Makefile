# benchmarks
cwd := $(shell pwd)

es5:
	node --max_old_space_size=120000 bench-es5

es6:
	node --max_old_space_size=120000 bench-es6

ts:
	node --max_old_space_size=120000 bench-ts

small:
	node --max_old_space_size=120000 bench-small

require:
	node --max_old_space_size=120000 bench-require

deps:
	node --max_old_space_size=120000 bench-deps

depsheavy:
	node --max_old_space_size=120000 bench-depsheavy

xs:
	node --max_old_space_size=120000 bench-xs

.PHONY: es5 es6 ts small require deps depsheavy xs


# graphs
es5-graph:
	node --max_old_space_size=120000 bench-es5 --graph

es6-graph:
	node --max_old_space_size=120000 bench-es6 --graph

ts-graph:
	node --max_old_space_size=120000 bench-ts --graph

small-graph:
	node --max_old_space_size=120000 bench-small --graph

require-graph:
	node --max_old_space_size=120000 bench-require --graph

deps-graph:
	node --max_old_space_size=120000 bench-deps --graph

depsheavy-graph:
	node --max_old_space_size=120000 bench-depsheavy --graph

xs-graph:
	node --max_old_space_size=120000 bench-xs --graph

# make es5-graph es6-graph ts-graph small-graph require-graph deps-graph depsheavy-graph xs-graph


# graphs with reasons
es5-graph-reasons:
	node --max_old_space_size=120000 bench-es5 --graph --reasons

es6-graph-reasons:
	node --max_old_space_size=120000 bench-es6 --graph --reasons

ts-graph-reasons:
	node --max_old_space_size=120000 bench-ts --graph --reasons

small-graph-reasons:
	node --max_old_space_size=120000 bench-small --graph --reasons

require-graph-reasons:
	node --max_old_space_size=120000 bench-require --graph --reasons

deps-graph-reasons:
	node --max_old_space_size=120000 bench-deps --graph --reasons

depsheavy-graph-reasons:
	node --max_old_space_size=120000 bench-depsheavy --graph --reasons

xs-graph-reasons:
	node --max_old_space_size=120000 bench-xs --graph --reasons

# make es5-graph-reasons es6-graph-reasons ts-graph-reasons small-graph-reasons require-graph-reasons deps-graph-reasons depsheavy-graph-reasons xs-graph-reasons
