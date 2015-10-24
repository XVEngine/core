<?php

namespace XVEngine\Core\Handler;


use XVEngine\Core\Component\AbstractComponent;

class ReplaceHandler extends AbstractHandler {

    /**
     * 
     * @var string
     */
    public $name = "replace";


    /**
     * @var array
     */
    public $replaces = [];

    /**
     * @var array
     */
    public $replacesHTML = [];

    /**
     * 
     * @param string $componentID
     */
    public function __construct() {

    }


    /**
     * Method replace component with specific ID
     *
     * @author Krzysztof Bednarczyk
     * @param string $id
     * @param AbstractComponent $component
     * @return $this
     */
    public function replace($id, AbstractComponent $component){
        $this->replaces[] = array(
            "id" => $id,
            "component" => $component
        );
        return $this;
    }


    /**
     * Shorthand method to "replace"
     *
     * @author Krzysztof Bednarczyk
     * @param AbstractComponent $component
     * @return ReplaceHandler
     */
    public function replaceComponent(AbstractComponent $component){
        return $this->replace($component->getId(), $component);
    }


    /**
     * Method replace component form selector
     *
     * @author Krzysztof Bednarczyk
     * @param string $selector
     * @param AbstractComponent $component
     * @return $this
     */
    public function replaceHTML($selector,  AbstractComponent $component){
        $this->replacesHTML[] = array(
            "selector" => $selector,
            "component" => $component
        );
        return $this;
    }


    /**
     * @inheritdoc
     */
    public function jsonSerialize() {
        return array(
           "name" => $this->name,
           "replaces" => $this->replaces,
           "replacesHTML" => $this->replacesHTML
        );
    }

}
